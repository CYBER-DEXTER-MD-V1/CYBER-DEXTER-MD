import fetch from "node-fetch";
import cheerio from "cheerio";
import axios from "axios";
import fs from "fs";
import path from "path";

const movieDownloader = async (message, sock) => {
  const prefix = "/";
  const body = message.body || "";
  const isCmd = body.startsWith(prefix);
  const command = isCmd ? body.slice(prefix.length).trim().split(" ")[0] : "";
  const args = isCmd ? body.slice(prefix.length + command.length).trim() : "";

  if (command.toLowerCase() === "movie") {
    if (!args) {
      return sock.sendMessage(message.from, {
        text: `🎬 *Sinhala Subtitle Movie Downloader*\n\n*Usage:* /movie <Movie Name>\n*Example:* /movie Outbreak 2024`
      }, { quoted: message });
    }

    try {
      await sock.sendMessage(message.from, { text: `🔍 Searching for "${args}"...` }, { quoted: message });

      // 1. Search Movie on SinhalaSub
      const searchUrl = `https://sinhalasub.lk/?s=${encodeURIComponent(args)}`;
      const searchPage = await fetch(searchUrl);
      const searchHtml = await searchPage.text();
      const $ = cheerio.load(searchHtml);
      const firstMovieUrl = $(".jeg_postblock_content > h3 > a").attr("href");

      if (!firstMovieUrl) {
        return sock.sendMessage(message.from, { text: `❌ Movie not found! Try another name.` }, { quoted: message });
      }

      // 2. Fetch Movie Details from API
      const apiUrl = `https://apis-keith.vercel.app/movie/sinhalasub/movie?url=${encodeURIComponent(firstMovieUrl)}`;
      const apiRes = await fetch(apiUrl);
      const apiJson = await apiRes.json();

      if (!apiJson.status || !apiJson.result || !apiJson.result.data) {
        return sock.sendMessage(message.from, { text: `❌ Error fetching movie details.` }, { quoted: message });
      }

      const movie = apiJson.result.data;

      // 3. Find Best Download Option (smallest file for WhatsApp limit)
      const selected = movie.pixeldrain_dl.find(f => parseFloat(f.size) <= 100) || movie.pixeldrain_dl[0];

      if (!selected) {
        return sock.sendMessage(message.from, { text: `❌ No suitable file found.` }, { quoted: message });
      }

      const downloadLink = selected.link.replace("/api/file/", "/u/");

      // 4. Download the Movie File
      const tempFilePath = path.join("./", `movie_${Date.now()}.mp4`);
      const writer = fs.createWriteStream(tempFilePath);

      const downloadStream = await axios({
        method: "GET",
        url: downloadLink,
        responseType: "stream",
      });

      downloadStream.data.pipe(writer);

      await new Promise((resolve, reject) => {
        writer.on("finish", resolve);
        writer.on("error", reject);
      });

      // 5. Send Movie File
      await sock.sendMessage(message.from, {
        video: fs.readFileSync(tempFilePath),
        caption: `🎬 *${movie.title}*\n⭐ TMDB Rating: ${movie.tmdbRate}\n🌎 Country: ${movie.country}\n\n🍿 Enjoy your movie!`
      }, { quoted: message });

      // 6. Clean Up
      fs.unlinkSync(tempFilePath);

    } catch (err) {
      console.error("[Movie Downloader Error]", err);
      await sock.sendMessage(message.from, {
        text: `❌ Error occurred: ${err.message}`
      }, { quoted: message });
    }
  }
};

export default movieDownloader;

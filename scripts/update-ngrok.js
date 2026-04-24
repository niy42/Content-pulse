import fs from "fs";
import http from "http";

const ENV_PATH = "./.env";

http
  .get("http://127.0.0.1:4040/api/tunnels", (res) => {
    let data = "";

    res.on("data", (chunk) => (data += chunk));
    res.on("end", () => {
      const json = JSON.parse(data);

      const httpsTunnel = json.tunnels.find((t) =>
        t.public_url.startsWith("https"),
      );

      if (!httpsTunnel) {
        console.error("❌ No HTTPS tunnel found");
        return;
      }

      const url = httpsTunnel.public_url;

      console.log("🌐 Ngrok URL:", url);

      const envContent = `VITE_API_URL=${url}\n`;

      fs.writeFileSync(ENV_PATH, envContent);

      console.log("✅ .env updated");
    });
  })
  .on("error", (err) => {
    console.error("❌ Error fetching ngrok URL:", err.message);
  });

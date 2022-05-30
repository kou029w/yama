const path = require("path");
const fs = require("fs").promises;
const crypto = require("crypto");

/** actions/github-script でのリリース成果物のアップロード */
module.exports = async function ({ github, context, glob }) {
  const version = context.payload.release.tag_name.replace(/^v/i, "");
  const target = {
    ...context.repo,
    release_id: context.payload.release.id,
  };
  let body = "## Yama\n";
  const globber = await glob.create("yama-armhf.*.gz");
  for await (const file of globber.globGenerator()) {
    const name = path
      .basename(file)
      .replace(/^yama-armhf[.]/, `yama-${version}-armhf.`);
    const data = await fs.readFile(file);
    await github.repos.uploadReleaseAsset({ ...target, name, data });
    const hash = crypto.createHash("sha256").update(data).digest("hex");
    body = `${body}
${name.split(".").includes("img") ? "OS イメージ" : "ファイルシステム"}

- ${name} (SHA256: \`${hash}\`)
`;
  }
  await github.repos.updateRelease({ ...target, body, prerelease: false });
};

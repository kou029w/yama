# Megabit OS

[Megabit](https://github.com/kou029w/megabit) をすぐに試せる実行環境とそれをビルドするためのツール群

## 使い方

1. [Releases](https://github.com/kou029w/megabit-os/releases) から OS イメージをダウンロード
2. イメージを microSD カードに書き込み
3. Raspberry Pi Zero とパソコンを USB で接続し、2 分待つ
4. 自動的に認識される USB マスストレージのルートに index.js を作成することで自動的に実行
   - 注意: index.js 以外の node_modules/ などは無視されます

## サンプルコード

index.js

```js
const { gpio } = require("megabit");
const sleep = require("util").promisify(setTimeout);

async function blink() {
  for (;;) {
    await gpio(26).write(1);
    await sleep(1000);
    await gpio(26).write(0);
    await sleep(1000);
  }
}

blink();
```

## 詳細

- Alpine Linux v3.14 ベース (armhf)
- Node.js v14.17.6

## ビルド

```sh
bin/build
bin/img-gen
```

### 前提条件

- Linux Kernel 4.8+
- binfmt-support 2.1.7+
- Docker
- Docker Compose
- qemu-user-static
- awk, bash, curl, fallocate, grep, gzip, gzip, losetup, mkfs.fat, parted, ruby, ssh-keygen, tar, xargs

### WiFi の設定

`apkovl/etc/wpa_supplicant/wpa_supplicant.conf` 配置後ビルド

```sh
bin/conf-gen | tee apkovl/etc/wpa_supplicant/wpa_supplicant.conf
```

### ssh の設定

`apkovl/root/.ssh/authorized_keys` をパーミッション 600 で配置後ビルド

## ライセンス

イメージに含まれているソフトウェアの[ライセンス情報](https://pkgs.alpinelinux.org/packages)を参照してください。
本リポジトリ内のソフトウェアは CC0-1.0 ライセンスです。

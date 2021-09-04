# Megabit OS

[Megabit](https://github.com/kou029w/megabit) をすぐに試せる実行環境とそれをビルドするためのツール群

## 使い方

1. [Releases](https://github.com/kou029w/megabit-os/releases) から OS イメージをダウンロード
2. イメージを microSD カードに書き込み
3. Raspberry Pi Zero とパソコンを USB で接続し、1-3 分ほど待つと起動
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
```

### SD カードのフォーマット

- FAT32 (LBA)
- boot フラグ付ける
- ボリュームラベル付けない

### SD カードに書き込み

```sh
tar xf megabit-armhf.tar.gz -C /path/to/sd/
```

### 前提条件

- Linux Kernel 4.8+
- binfmt-support 2.1.7+
- Docker
- Docker Compose
- curl
- grep
- gzip
- jq
- ruby
- ssh-keygen
- bash
- qemu-user-static

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

# Yama

Raspberry Pi Zero 向け OS のビルドするためのツール群

- Alpine Linux ベース (armhf)
- WiFi 対応
- その他オレオレカスタマイズ

## 使い方

1. [Releases](https://github.com/kou029w/yama/releases) からイメージをダウンロード
2. イメージを microSD カードに書き込む
3. (必要に応じて) microSD カードの中の setup-yama ファイルを編集して保存
4. microSD カードを Raspberry Pi Zero に差し込む
5. Raspberry Pi Zero の電源投入

電源投入後、2 分で起動完了

## ビルド

```sh
bin/build
```

### 前提条件

- Linux Kernel 4.8+
- binfmt-support 2.1.7+
- Docker
- Docker Compose
- qemu-user-static
- curl, fallocate, gzip, losetup, mkfs.ext4, mkfs.fat, parted, python3, tar, xargs

## ライセンス

イメージに含まれているソフトウェアの[ライセンス情報](https://pkgs.alpinelinux.org/packages)を参照してください。
本リポジトリ内のソフトウェアは CC0-1.0 ライセンスです。

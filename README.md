# Yumemi Coding Test

[ゆめみフロントエンドコーディング試験](https://yumemi.notion.site/0e9ef27b55704d7882aab55cc86c999d)

## 開発環境

- ランタイム: bun 1.2.5
- フレームワーク: Next.js 15.2.4
- フォーマッタ: Prettier
- 静的解析: ESLint
- スタイル: Tailwind CSS
- テストツール: Jest,Playwright

## スタート

### 1. 依存関係をインストール

```bash
bun install
```

### 2. `.env` ファイルを作成して、YUMEMI_API_KEY を設定

```env
YUMEMI_API_KEY={{キー}}
```

### 3. 開発サーバーを起動

> [!NOTE]  
> `VSCode` を使用している場合、 `F5` キーを押すか、  
> 「実行とデバッグ > `Next.js: debug full stack`」からデバッグモードで起動可能です

```bash
bun run dev
```

## スクリプト

- `dev`: 開発サーバーを起動します
- `start`: 本番サーバーを起動します
- `build`: ビルドを行います
- `lint`: ESLint による静的解析を実行します
- `test`: 単体・結合テストを実行します
- `test:e2e`: E2E テストを実行します

## テスト

### 単体・結合レベルのテスト

```bash
bun test
# または
 bun run test
```

### E2Eテスト

E2E テスト実行前に、`build` スクリプトを実行するか、開発／本番サーバーを起動しておく必要があります

```bash
bun run test:e2e
# または
bunx playwright test
```

## コミットメッセージ

コミットメッセージは、[Conventional Commits](https://www.conventionalcommits.org/ja/v1.0.0/) に従ってください

### Prefix

- feat: 新機能の追加
- fix: バグ修正
- docs: ドキュメントの変更
- style: フォーマットの変更（コードの意味に影響しないもの）
- refactor: リファクタリング（機能追加やバグ修正を含まない）
- perf: パフォーマンス改善
- chore: ビルドプロセスや補助ツールの変更
- test: テストコードの追加や修正

### Copilot Commit Message

`./copilot-commit-message-instructions.md` に記載された内容を参考にコミットメッセージが生成されます

## 関連リンク

[デプロイ先（Vercel）](https://yumemi-cording-test-roan.vercel.app/)

## 課題のレポート

### 課題に要した時間

- 42 時間

### プログラミング経験歴

- プログラミング歴: 4 年
- WEB フロントエンド フロントエンド歴: 4 年

### 着手にあたり参考にしたページや書籍やリポジトリ

- [Restore mock.module using mock.restore not work as expect #7823
  ](https://github.com/oven-sh/bun/issues/7823)
  - bun:test の `mock` の仕様について

### AI を利用した場合成果

- Copilot Commit Message
  - コミットメッセージのフォーマットを統一するために使用
  - 型の設定がコミットに対して曖昧なため、自分で修正する必要がかなりあった
  - 命令をもっと具体的かつ詳細に書き込む必要がある

# 🧵 jaro

a small string distance algorithm

## 🖥️ use

```sh
$ pnpm add @drainpixie/jaro
```

```ts
import { jaro, jaroWinkler } from "@drainpixie/jaro";

jaro("dwayne", "duane"); // 0.8222222222222223
jaroWinkler("dwayne", "duane"); // 0.8400000000000001
```

## 🖥️ dev

```sh
nix develop
pnpm install
```

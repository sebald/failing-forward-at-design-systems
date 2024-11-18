import { normalizePath, Plugin, ResolvedConfig } from "vite";
import path from "node:path";
import fs from "node:fs";
import { globby } from "globby";

export interface InjectFolderConfig {
  tagName?: string;
}

const injectFolder = (pluginConfig?: InjectFolderConfig): Plugin => {
  // Nothing yet
  const { tagName = "include" } = { ...pluginConfig };

  let config: undefined | ResolvedConfig;
  const tagMatcher = new RegExp(
    `<${tagName}\\s+[^>]*?path="([^"]*)".*?\\/>`,
    "gsi",
  );

  // Store file paths, for hot updates
  const watched = new Set<string>();

  const render = async (code: string, codePath: string) => {
    if (!config) {
      return code;
    }

    // Find all tags
    const matches = code.matchAll(tagMatcher);

    for (const match of matches) {
      const [tag, pattern] = match;
      const root = config.root;
      let html = "";

      // Find files matching the path pattern
      const files = await globby(normalizePath(path.join(root, pattern)));
      files.sort().forEach(file => {
        watched.add(file);

        try {
          const contents = fs.readFileSync(file, "utf8");
          html += contents;
        } catch (error) {
          if (error instanceof Error) {
            throw new Error("injectFolder: " + error.message);
          }
          throw new Error(`${error}`);
        }
      });

      code = code.replace(tag, html);
    }

    return code;
  };

  return {
    name: "vite-plugin-html-inject",
    configResolved(resolvedConfig) {
      config = resolvedConfig;
    },
    handleHotUpdate({ file, server }) {
      if (watched.has(file)) {
        server.ws.send({
          type: "full-reload",
          path: "*",
        });
      }
    },
    transformIndexHtml: {
      order: "pre",
      handler(html, ctx) {
        return render(html, ctx.path);
      },
    },
  };
};

export default injectFolder;

import {
  type LanguageSupport as LS,
  type StreamParser,
} from "@codemirror/language";
import type { Extension } from "@codemirror/state";

export type LanguageDefinition = {
  id: string;
  label: string;
  fileExtension: string; // Added fileExtension property
  extension: () => Promise<Extension>;
};

const importLegacy = () =>
  import("@codemirror/language").then(({ LanguageSupport, StreamLanguage }) => {
    return function legacy(parser: StreamParser<unknown>): LS {
      return new LanguageSupport(StreamLanguage.define(parser));
    };
  });

export const SUPPORTED_LANGUAGES: LanguageDefinition[] = [
  {
    id: "typescript",
    label: "Typescript (tsx)",
    fileExtension: ".tsx", // Added fileExtension property
    extension: () =>
      import("@codemirror/lang-javascript").then(({ javascript }) =>
        javascript({ jsx: true, typescript: true })
      ),
  },
  {
    id: "typescript (ts)",
    label: "Typescript (ts)",
    fileExtension: ".ts", // Changed fileExtension property to .ts
    extension: () =>
      import("@codemirror/lang-javascript").then(
        ({ javascript }) => javascript({ typescript: true }) // Removed jsx: true as .ts files don't typically contain JSX
      ),
  },
  {
    id: "javascript (js)",
    label: "Javascript (js)",
    fileExtension: ".js", // Added fileExtension property
    extension: () =>
      import("@codemirror/lang-javascript").then(({ javascript }) =>
        javascript({ jsx: false })
      ),
  },
  {
    id: "javascript (jsx)",
    label: "Javascript (jsx)",
    fileExtension: ".jsx", // Added fileExtension property
    extension: () =>
      import("@codemirror/lang-javascript").then(({ javascript }) =>
        javascript({ jsx: true })
      ),
  },
  {
    id: "java",
    label: "Java",
    fileExtension: ".java", // Added fileExtension property
    extension: () => import("@codemirror/lang-java").then(({ java }) => java()),
  },
  {
    id: "kotlin",
    label: "Kotlin",
    fileExtension: ".kt", // Added fileExtension property
    extension: () =>
      Promise.all([
        importLegacy(),
        import("@codemirror/legacy-modes/mode/clike"),
      ]).then(([cb, m]) => cb(m.kotlin)),
  },
  {
    id: "ruby",
    label: "Ruby",
    fileExtension: ".rb", // Added fileExtension property
    extension: () =>
      Promise.all([
        importLegacy(),
        import("@codemirror/legacy-modes/mode/ruby"),
      ]).then(([cb, m]) => cb(m.ruby)),
  },
  {
    id: "css",
    label: "CSS",
    fileExtension: ".css", // Added fileExtension property
    extension: () => import("@codemirror/lang-css").then(({ css }) => css()),
  },
  {
    id: "html",
    label: "HTML",
    fileExtension: ".html", // Added fileExtension property
    extension: () =>
      import("@codemirror/lang-html").then(({ html }) =>
        html({ matchClosingTags: true, autoCloseTags: true })
      ),
  },
  {
    id: "php",
    label: "PHP",
    fileExtension: ".php", // Added fileExtension property
    extension: () => import("@codemirror/lang-php").then(({ php }) => php()),
  },
  {
    id: "python",
    label: "Python",
    fileExtension: ".py", // Added fileExtension property
    extension: () =>
      import("@codemirror/lang-python").then(({ python }) => python()),
  },
  {
    id: "markdown",
    label: "Markdown",
    fileExtension: ".md", // Added fileExtension property
    extension: () =>
      import("@codemirror/lang-markdown").then(({ markdown }) => markdown()),
  },
  {
    id: "rust",
    label: "Rust",
    fileExtension: ".rs", // Added fileExtension property
    extension: () => import("@codemirror/lang-rust").then(({ rust }) => rust()),
  },
  {
    id: "cpp",
    label: "C++",
    fileExtension: ".cpp", // Added fileExtension property
    extension: () => import("@codemirror/lang-cpp").then(({ cpp }) => cpp()),
  },
  {
    id: "xml",
    label: "XML",
    fileExtension: ".xml", // Added fileExtension property
    extension: () => import("@codemirror/lang-xml").then(({ xml }) => xml()),
  },
  {
    id: "json",
    label: "JSON",
    fileExtension: ".json", // Added fileExtension property
    extension: () => import("@codemirror/lang-json").then(({ json }) => json()),
  },
  {
    id: "sql",
    label: "SQL",
    fileExtension: ".sql", // Added fileExtension property
    extension: () => import("@codemirror/lang-sql").then(({ sql }) => sql()),
  },
  {
    id: "shell",
    label: "Shell",
    fileExtension: ".sh", // Added fileExtension property
    extension: () =>
      Promise.all([
        importLegacy(),
        import("@codemirror/legacy-modes/mode/shell"),
      ]).then(([cb, m]) => cb(m.shell)),
  },
  {
    id: "no language",
    label: "No language",
    fileExtension: "", // Added fileExtension property
    extension: () =>
      import("@codemirror/lang-markdown").then(({ markdown }) => markdown()),
  },
];

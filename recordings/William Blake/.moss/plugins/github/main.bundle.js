"use strict";
var GithubPlugin = (() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // src/main.ts
  var main_exports = {};
  __export(main_exports, {
    configure_domain: () => configure_domain,
    default: () => main_default,
    deploy: () => deploy,
    on_configure_domain: () => configure_domain,
    on_deploy: () => deploy
  });

  // ../../packages/moss-api/dist/index.mjs
  function getTauriCore() {
    const w = window;
    if (!w.__TAURI__?.core) throw new Error("Tauri core not available");
    return w.__TAURI__.core;
  }
  function isTauriAvailable() {
    return !!window.__TAURI__?.core;
  }
  function getTauriEvent$1() {
    const w = window;
    if (!w.__TAURI__?.event) throw new Error("Tauri event API not available");
    return w.__TAURI__.event;
  }
  function isEventApiAvailable() {
    return !!window.__TAURI__?.event;
  }
  async function emitEvent(event, payload) {
    await getTauriEvent$1().emit(event, payload);
  }
  async function onEvent(event, handler) {
    return await getTauriEvent$1().listen(event, (e) => {
      handler(e.payload);
    });
  }
  var currentPluginName = "";
  var currentHookName = "";
  function setMessageContext(pluginName, hookName) {
    currentPluginName = pluginName;
    currentHookName = hookName;
  }
  async function sendMessage(message) {
    if (message.type === "log" || message.type === "progress") {
      if (!isEventApiAvailable()) return;
      try {
        await emitEvent("plugin-message", {
          pluginName: currentPluginName,
          hookName: currentHookName,
          message
        });
      } catch {
      }
      return;
    }
    if (!isTauriAvailable()) return;
    try {
      await getTauriCore().invoke("plugin_message", {
        pluginName: currentPluginName,
        hookName: currentHookName,
        message
      });
    } catch (error) {
      console.error("\u274C [SDK] Failed to send message:", message.type, "\u2013", error);
    }
  }
  async function reportProgress(phase, current, total, message) {
    await sendMessage({
      type: "progress",
      phase,
      current,
      total,
      message
    });
  }
  async function reportError(error, context, fatal = false) {
    await sendMessage({
      type: "error",
      error,
      context,
      fatal
    });
  }
  var BROWSER_BRIDGE_SCRIPT = `<script>
(function() {
  const { event, core } = window.__TAURI__;
  window.mossApi = {
    close: () => core.invoke('close_action_panel'),
    emit: (name, payload) => event.emit(name, payload),
  };
})();
<\/script>`;
  function injectBridgeScript(html) {
    const headCloseIdx = html.indexOf("</head>");
    if (headCloseIdx !== -1) return html.slice(0, headCloseIdx) + BROWSER_BRIDGE_SCRIPT + html.slice(headCloseIdx);
    return BROWSER_BRIDGE_SCRIPT + html;
  }
  async function closeBrowser() {
    await getTauriCore().invoke("close_action_panel", {});
  }
  async function openSystemBrowser(url) {
    await getTauriCore().invoke("open_system_browser", { url });
  }
  async function openBrowserWithHtml(html) {
    const injectedHtml = injectBridgeScript(html);
    await getTauriCore().invoke("set_action_panel_html", { html: injectedHtml });
  }
  function getInternalContext() {
    const context = window.__MOSS_INTERNAL_CONTEXT__;
    if (!context) throw new Error("This function must be called from within a plugin hook. Ensure you're calling this from process(), generate(), deploy(), or syndicate().");
    return context;
  }
  function hasContext() {
    return window.__MOSS_INTERNAL_CONTEXT__ !== void 0;
  }
  async function listSiteFilesWithSizes() {
    return getTauriCore().invoke("list_site_files_with_sizes", {});
  }
  async function fetchUrl(url, options = {}) {
    const { timeoutMs = 3e4 } = options;
    const result = await getTauriCore().invoke("fetch_url", {
      url,
      timeoutMs
    });
    const binaryString = atob(result.body_base64);
    const bytes = Uint8Array.from(binaryString, (char) => char.charCodeAt(0));
    return {
      status: result.status,
      ok: result.ok,
      contentType: result.content_type,
      body: bytes,
      text() {
        return new TextDecoder().decode(bytes);
      }
    };
  }
  async function httpPost(url, body, options = {}) {
    const { timeoutMs = 3e4, headers = {} } = options;
    const result = await getTauriCore().invoke("http_post", {
      url,
      body: JSON.stringify(body),
      headers,
      timeoutMs
    });
    const binaryString = atob(result.body_base64);
    const bytes = Uint8Array.from(binaryString, (char) => char.charCodeAt(0));
    return {
      status: result.status,
      ok: result.ok,
      contentType: result.content_type,
      body: bytes,
      text() {
        return new TextDecoder().decode(bytes);
      }
    };
  }
  async function executeBinary(options) {
    const ctx = getInternalContext();
    const { binaryPath, args, timeoutMs = 6e4, env, stdin, workingDir, onStderr } = options;
    const resolvedWorkingDir = workingDir ? `${ctx.project_path}/${workingDir}` : ctx.project_path;
    const streamId = onStderr ? crypto.randomUUID() : void 0;
    let unlisten;
    if (onStderr && streamId) unlisten = await onEvent("binary-output", (payload) => {
      if (payload.streamId === streamId) onStderr(payload.line);
    });
    try {
      const result = await getTauriCore().invoke("execute_binary", {
        binaryPath,
        args,
        workingDir: resolvedWorkingDir,
        timeoutMs,
        env,
        stdinData: stdin,
        streamId
      });
      return {
        success: result.success,
        exitCode: result.exit_code,
        stdout: result.stdout,
        stderr: result.stderr
      };
    } finally {
      if (unlisten) unlisten();
    }
  }
  async function getPluginCookie() {
    if (!hasContext()) return null;
    const ctx = getInternalContext();
    return getTauriCore().invoke("get_plugin_cookie", {
      pluginName: ctx.plugin_name,
      projectPath: ctx.project_path
    });
  }
  async function setPluginCookie(cookies) {
    const ctx = getInternalContext();
    await getTauriCore().invoke("set_plugin_cookie", {
      pluginName: ctx.plugin_name,
      projectPath: ctx.project_path,
      cookies
    });
  }
  var TOAST_EVENT = "show-toast";
  async function showToast(options) {
    await emitEvent(TOAST_EVENT, typeof options === "string" ? { message: options } : options);
  }

  // src/utils.ts
  var PLUGIN_NAME = "github";
  setMessageContext(PLUGIN_NAME, "deploy");
  function setCurrentHookName(name) {
    setMessageContext(PLUGIN_NAME, name);
  }
  async function reportProgress2(phase, current, total, message) {
    await reportProgress(phase, current, total, message);
  }
  async function reportError2(error, context, fatal = false) {
    await reportError(error, context, fatal);
  }
  async function showToast2(options) {
    await showToast(options);
  }
  async function closeBrowser2() {
    await closeBrowser();
  }
  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  // src/git.ts
  function parseGitHubUrl(remoteUrl) {
    const httpsMatch = remoteUrl.match(/^https:\/\/github\.com\/([^/]+)\/([^/]+?)(?:\.git)?$/);
    if (httpsMatch) {
      return { owner: httpsMatch[1], repo: httpsMatch[2] };
    }
    const sshMatch = remoteUrl.match(/^git@github\.com:([^/]+)\/([^/]+?)(?:\.git)?$/);
    if (sshMatch) {
      return { owner: sshMatch[1], repo: sshMatch[2] };
    }
    return null;
  }
  function buildPagesUrl(owner, repo) {
    if (repo.toLowerCase() === `${owner.toLowerCase()}.github.io`) {
      return `https://${owner}.github.io`;
    }
    return `https://${owner}.github.io/${repo}`;
  }

  // src/github-api.ts
  var GITHUB_API_BASE = "https://api.github.com";
  var GITHUB_API_HEADERS = {
    Accept: "application/vnd.github.v3+json",
    "User-Agent": "moss-GitHub-Deployer"
  };
  async function getAuthenticatedUser(token) {
    const response = await fetch(`${GITHUB_API_BASE}/user`, {
      headers: {
        ...GITHUB_API_HEADERS,
        Authorization: `Bearer ${token}`
      }
    });
    if (!response.ok) {
      if (response.status === 401) {
        throw new Error("Invalid or expired token");
      }
      throw new Error(`Failed to get user: ${response.status}`);
    }
    return response.json();
  }
  async function createRepository(name, token, description) {
    console.log(`Creating repository: ${name}`);
    const response = await fetch(`${GITHUB_API_BASE}/user/repos`, {
      method: "POST",
      headers: {
        ...GITHUB_API_HEADERS,
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name,
        description: description ?? "Created with moss",
        private: false,
        // Always public for GitHub Pages
        auto_init: false
        // Force-push overwrites any initial commit; avoid useless "Initial commit"
      })
    });
    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      const message = error.message || `Failed to create repository: ${response.status}`;
      throw new Error(message);
    }
    const repo = await response.json();
    console.log(`Repository created: ${repo.html_url}`);
    return {
      name: repo.name,
      fullName: repo.full_name,
      htmlUrl: repo.html_url,
      sshUrl: repo.ssh_url,
      cloneUrl: repo.clone_url
    };
  }
  async function getRepoSshUrl(owner, repo, token) {
    const response = await fetch(`${GITHUB_API_BASE}/repos/${owner}/${repo}`, {
      headers: { ...GITHUB_API_HEADERS, Authorization: `Bearer ${token}` }
    });
    if (!response.ok) throw new Error(`Repo not found: ${owner}/${repo}`);
    const data = await response.json();
    return data.ssh_url;
  }
  async function checkRepoExists(owner, name, token) {
    try {
      const response = await fetch(`${GITHUB_API_BASE}/repos/${owner}/${name}`, {
        headers: {
          ...GITHUB_API_HEADERS,
          Authorization: `Bearer ${token}`
        }
      });
      return response.ok;
    } catch {
      return false;
    }
  }
  async function checkPagesStatus(owner, repo, token) {
    try {
      const response = await fetch(
        `${GITHUB_API_BASE}/repos/${owner}/${repo}/pages/builds/latest`,
        {
          headers: {
            ...GITHUB_API_HEADERS,
            Authorization: `Bearer ${token}`
          }
        }
      );
      if (!response.ok) {
        return { status: "unknown", url: "" };
      }
      const data = await response.json();
      const isRootRepo = repo === `${owner}.github.io`;
      const url = isRootRepo ? `https://${owner}.github.io/` : `https://${owner}.github.io/${repo}`;
      const status = data.status;
      return {
        status: status || "unknown",
        url,
        commit: data.commit || void 0,
        error: data.error?.message || void 0
      };
    } catch {
      return { status: "unknown", url: "" };
    }
  }
  async function requestPagesBuild(owner, repo, token) {
    try {
      const response = await fetch(
        `${GITHUB_API_BASE}/repos/${owner}/${repo}/pages/builds`,
        {
          method: "POST",
          headers: {
            ...GITHUB_API_HEADERS,
            Authorization: `Bearer ${token}`
          }
        }
      );
      return response.ok;
    } catch {
      return false;
    }
  }
  async function getPages(owner, repo, token) {
    const url = `${GITHUB_API_BASE}/repos/${owner}/${repo}/pages`;
    const response = await fetch(url, {
      headers: { ...GITHUB_API_HEADERS, Authorization: `Bearer ${token}` }
    });
    if (!response.ok) return null;
    const data = await response.json();
    return { cname: data.cname || null, https_enforced: !!data.https_enforced };
  }
  async function enforceHttps(owner, repo, token) {
    const url = `${GITHUB_API_BASE}/repos/${owner}/${repo}/pages`;
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        ...GITHUB_API_HEADERS,
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ https_enforced: true })
    });
    return response.ok;
  }
  async function setCustomDomain(owner, repo, token, domain) {
    const url = `${GITHUB_API_BASE}/repos/${owner}/${repo}/pages`;
    const headers = {
      ...GITHUB_API_HEADERS,
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    };
    const response = await fetch(url, {
      method: "PUT",
      headers,
      body: JSON.stringify({ cname: domain, https_enforced: true })
    });
    if (response.ok) return true;
    if (response.status === 422 || response.status === 404) {
      const retryResponse = await fetch(url, {
        method: "PUT",
        headers,
        body: JSON.stringify({ cname: domain })
      });
      if (retryResponse.ok) return true;
      if (retryResponse.status === 404) return true;
      const body2 = await retryResponse.text();
      throw new Error(
        `GitHub Pages API error (${retryResponse.status}): ${body2}`
      );
    }
    const body = await response.text();
    throw new Error(
      `GitHub Pages API error (${response.status}): ${body}`
    );
  }
  async function ensurePagesSource(owner, repo, token, branch) {
    const url = `${GITHUB_API_BASE}/repos/${owner}/${repo}/pages`;
    const headers = {
      ...GITHUB_API_HEADERS,
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    };
    const sourceBody = JSON.stringify({ source: { branch, path: "/" } });
    try {
      const getResp = await fetch(url, { headers });
      if (getResp.status === 404) {
        const postResp = await fetch(url, { method: "POST", headers, body: sourceBody });
        if (postResp.ok) {
          return { configured: true, wasCreated: true };
        }
        return { configured: false, wasCreated: false };
      }
      if (getResp.ok) {
        const data = await getResp.json();
        if (data.source?.branch === branch) {
          return { configured: true, wasCreated: false };
        }
        const putResp = await fetch(url, { method: "PUT", headers, body: sourceBody });
        if (putResp.ok) {
          return { configured: true, wasCreated: false };
        }
        return { configured: false, wasCreated: false };
      }
      return { configured: false, wasCreated: false };
    } catch {
      return { configured: false, wasCreated: false };
    }
  }

  // src/github-deploy.ts
  async function parseErrorMessage(response) {
    try {
      const body = await response.json();
      return body.message || `GitHub API error: ${response.status}`;
    } catch {
      return `GitHub API error: ${response.status}`;
    }
  }
  async function verifyRepoExists(owner, repo, token) {
    const headers = {
      ...GITHUB_API_HEADERS,
      Authorization: `Bearer ${token}`
    };
    const response = await fetch(
      `${GITHUB_API_BASE}/repos/${owner}/${repo}`,
      { headers }
    );
    if (response.status === 404) {
      const ownerResp = await fetch(`${GITHUB_API_BASE}/users/${owner}`, {
        headers: { ...GITHUB_API_HEADERS }
      });
      if (ownerResp.status === 404) {
        throw new Error(
          `GitHub user or organization "${owner}" not found. Check for typos in the repository owner name.`
        );
      }
      throw new Error(
        `Repository "${owner}/${repo}" not found on GitHub. The repository may not exist, or your token may not have access to it.`
      );
    }
    if (response.status === 401) {
      throw new Error(
        `GitHub token is invalid or expired. Please re-authenticate.`
      );
    }
    if (response.status === 403) {
      throw new Error(
        `Access denied to "${owner}/${repo}". Your token may lack the required "repo" scope.`
      );
    }
    if (!response.ok) {
      const msg = await parseErrorMessage(response);
      throw new Error(msg);
    }
  }
  async function getOriginOwnerRepo(gitPath = "git") {
    const result = await executeBinary({
      binaryPath: gitPath,
      args: ["remote", "get-url", "origin"],
      workingDir: ".",
      timeoutMs: 5e3,
      env: { GIT_TERMINAL_PROMPT: "0" }
    });
    if (!result.success) return null;
    const url = result.stdout.trim();
    const httpsMatch = url.match(/^https:\/\/github\.com\/([^/]+)\/([^/]+?)(?:\.git)?$/);
    if (httpsMatch) return { owner: httpsMatch[1], repo: httpsMatch[2] };
    const sshMatch = url.match(/^git@github\.com:([^/]+)\/([^/]+?)(?:\.git)?$/);
    if (sshMatch) return { owner: sshMatch[1], repo: sshMatch[2] };
    return null;
  }
  var MAX_FILE_SIZE = 100 * 1024 * 1024;
  var CORRUPT_GIT_PATTERNS = [
    "Could not read",
    "Failed to traverse parents",
    "bad object",
    "corrupt"
  ];
  function looksLikeCorruptGit(errorMsg) {
    return CORRUPT_GIT_PATTERNS.some((p) => errorMsg.includes(p));
  }
  function sanitize(text, token) {
    return text.replaceAll(token, "***");
  }
  function formatSize(bytes) {
    if (bytes >= 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024 * 1024)).toFixed(1)} GB`;
    if (bytes >= 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
    if (bytes >= 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${bytes} B`;
  }
  function parsePushProgress(line, rangeStart, rangeEnd, onProgress, token) {
    const match = line.match(/Writing objects:\s+(\d+)%/);
    if (match) {
      const gitPercent = parseInt(match[1], 10);
      const mapped = Math.round(rangeStart + gitPercent / 100 * (rangeEnd - rangeStart));
      onProgress(mapped, sanitize(line.trim(), token));
    }
  }
  async function deployViaGitPush(options) {
    const { owner, repo, token, onProgress } = options;
    const repoMarker = `https://github.com/${owner}/${repo}.git`;
    const pushUrl = `https://x-access-token:${token}@github.com/${owner}/${repo}.git`;
    async function git(args, onStderr) {
      return executeBinary({
        binaryPath: options.gitPath,
        args,
        workingDir: ".",
        timeoutMs: 6e5,
        // 10 min — first push of large repos can be slow
        env: { GIT_TERMINAL_PROMPT: "0" },
        onStderr
      });
    }
    onProgress(0, "Preparing deploy...");
    const siteFiles = await listSiteFilesWithSizes();
    const oversizedSiteFiles = siteFiles.filter((f) => f.size > MAX_FILE_SIZE);
    if (oversizedSiteFiles.length > 0) {
      const fileList = oversizedSiteFiles.map((f) => `  ${f.path} (${formatSize(f.size)})`).join("\n");
      throw new Error(
        `Site files exceed GitHub's 100 MB per-file limit:
${fileList}

Remove or reduce these files before deploying.`
      );
    }
    async function attemptDeploy() {
      const check = await git(["rev-parse", "--git-dir"]);
      let needsInit = !check.success;
      if (check.success) {
        const originUrl = await git(["remote", "get-url", "origin"]);
        if (!originUrl.success || originUrl.stdout.trim() !== repoMarker) {
          const rm = await executeBinary({
            binaryPath: "rm",
            args: ["-rf", ".git"],
            workingDir: ".",
            timeoutMs: 1e4,
            env: {}
          });
          if (!rm.success) throw new Error(`Failed to remove stale .git: ${rm.stderr}`);
          needsInit = true;
        }
      }
      if (needsInit) {
        await git(["init"]);
        await git(["config", "user.email", "moss@symbiosis-lab.com"]);
        await git(["config", "user.name", "moss"]);
        await git(["remote", "add", "origin", repoMarker]);
      }
      const fetchResult = await git(["fetch", "--depth=1", "origin"]);
      if (!fetchResult.success) {
        console.log("   No remote history to fetch (first deploy)");
      }
      await executeBinary({
        binaryPath: "sh",
        args: ["-c", "[ -f .gitignore ] && sed -i '' '/^\\.moss/d;/^!\\.moss/d' .gitignore || true"],
        workingDir: ".",
        timeoutMs: 5e3,
        env: {}
      });
      await executeBinary({
        binaryPath: "rm",
        args: ["-f", ".git/index.lock"],
        workingDir: ".",
        timeoutMs: 5e3,
        env: {}
      });
      await executeBinary({
        binaryPath: "rm",
        args: ["-f", ".git/shallow.lock"],
        workingDir: ".",
        timeoutMs: 5e3,
        env: {}
      });
      onProgress(5, "Staging site files...");
      await git(["add", ".moss/build/site/"]);
      await executeBinary({
        binaryPath: "rm",
        args: ["-f", ".git/index.lock"],
        workingDir: ".",
        timeoutMs: 5e3,
        env: {}
      });
      onProgress(10, "Preparing gh-pages...");
      const writeTree = await git(["write-tree", "--prefix=.moss/build/site/"]);
      if (!writeTree.success) throw new Error(`Failed to write site tree: ${sanitize(writeTree.stderr, token)}`);
      let treeSha = writeTree.stdout.trim();
      {
        const nojekyllHash = await executeBinary({
          binaryPath: options.gitPath,
          args: ["hash-object", "-w", "--stdin"],
          workingDir: ".",
          timeoutMs: 3e4,
          // iCloud can slow .git/objects writes
          env: { GIT_TERMINAL_PROMPT: "0" },
          stdin: ""
        });
        if (nojekyllHash.success) {
          const lsTree = await git(["ls-tree", treeSha]);
          if (lsTree.success) {
            const filteredEntries = lsTree.stdout.trimEnd().split("\n").filter((line) => !line.endsWith("	.nojekyll") && !line.endsWith("	CNAME")).join("\n");
            let treeEntries = filteredEntries + "\n100644 blob " + nojekyllHash.stdout.trim() + "	.nojekyll\n";
            if (options.domain) {
              const cnameHash = await executeBinary({
                binaryPath: options.gitPath,
                args: ["hash-object", "-w", "--stdin"],
                workingDir: ".",
                timeoutMs: 3e4,
                env: { GIT_TERMINAL_PROMPT: "0" },
                stdin: options.domain + "\n"
              });
              if (cnameHash.success) {
                treeEntries += "100644 blob " + cnameHash.stdout.trim() + "	CNAME\n";
              }
            }
            const mktree = await executeBinary({
              binaryPath: options.gitPath,
              args: ["mktree"],
              workingDir: ".",
              timeoutMs: 3e4,
              env: { GIT_TERMINAL_PROMPT: "0" },
              stdin: treeEntries
            });
            if (mktree.success) treeSha = mktree.stdout.trim();
          }
        }
      }
      const ghPagesTip = await git(["rev-parse", "refs/remotes/origin/gh-pages"]);
      let treeChanged = true;
      if (ghPagesTip.success) {
        const prevTree = await git(["rev-parse", `${ghPagesTip.stdout.trim()}^{tree}`]);
        if (prevTree.success && prevTree.stdout.trim() === treeSha) {
          treeChanged = false;
        }
      }
      const commitTreeArgs = ghPagesTip.success ? ["commit-tree", treeSha, "-p", ghPagesTip.stdout.trim(), "-m", "Deploy site\n\nGenerated by moss"] : ["commit-tree", treeSha, "-m", "Deploy site\n\nGenerated by moss"];
      const orphan = await git(commitTreeArgs);
      if (!orphan.success) throw new Error(`Failed to create gh-pages commit: ${sanitize(orphan.stderr, token)}`);
      const orphanSha = orphan.stdout.trim();
      onProgress(25, "Pushing to GitHub...");
      const push = await git(
        [
          "push",
          "--force",
          "--progress",
          pushUrl,
          `${orphanSha}:refs/heads/gh-pages`
        ],
        (line) => parsePushProgress(line, 25, 95, onProgress, token)
      );
      if (!push.success) throw new Error(`git push failed: ${sanitize(push.stderr, token)}`);
      onProgress(100, "Deployed!");
      onProgress(100, "Backing up source...");
      let sha = "";
      try {
        const findResult = await executeBinary({
          binaryPath: "find",
          args: [
            ".",
            "-not",
            "-path",
            "./.moss/*",
            "-not",
            "-path",
            "./.git/*",
            "-type",
            "f",
            "-size",
            "+100M"
          ],
          workingDir: ".",
          timeoutMs: 3e4,
          env: {}
        });
        const largeSourceFiles = findResult.stdout.split("\n").map((l) => l.trim()).filter((l) => l.length > 0).map((l) => l.startsWith("./") ? l.slice(2) : l);
        if (largeSourceFiles.length > 0) {
          const escapedFiles = largeSourceFiles.map((f) => f.replace(/'/g, "'\\''")).join("\\n");
          await executeBinary({
            binaryPath: "sh",
            args: ["-c", `printf "\\n${escapedFiles}\\n" >> .gitignore`],
            workingDir: ".",
            timeoutMs: 5e3,
            env: {}
          });
          const fileList = largeSourceFiles.map((f) => `&nbsp;&nbsp;${f}`).join("<br>");
          await showToast2({
            variant: "warning",
            message: `Skipped ${largeSourceFiles.length} file(s) exceeding 100 MB:<br>${fileList}`,
            duration: 1e4
          });
        }
        await git(["add", "--all"]);
        const diff = await git(["diff", "--cached", "--quiet"]);
        if (!diff.success) {
          const commit = await git(["commit", "-m", "Deploy site\n\nGenerated by moss"]);
          if (commit.success) {
            const revParse = await git(["rev-parse", "--short", "HEAD"]);
            sha = revParse.success ? revParse.stdout.trim() : "";
            await git(["push", pushUrl, "HEAD:refs/heads/main"]);
          }
        } else {
          const behind = await git(["rev-list", "--count", "origin/main..HEAD"]);
          if (behind.success && parseInt(behind.stdout.trim(), 10) > 0) {
            await git(["push", pushUrl, "HEAD:refs/heads/main"]);
          }
        }
      } catch {
        console.warn("Source backup to main branch failed (non-fatal)");
      }
      return { commitSha: sha, orphanSha, treeChanged };
    }
    try {
      return await attemptDeploy();
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      if (!looksLikeCorruptGit(msg)) throw err;
      onProgress(0, "Recovering from corrupt git state...");
      console.warn("Corrupt git detected, reinitializing .git");
      await executeBinary({
        binaryPath: "rm",
        args: ["-rf", ".git"],
        workingDir: ".",
        timeoutMs: 1e4,
        env: {}
      });
      return await attemptDeploy();
    }
  }

  // src/token.ts
  var GITHUB_HOST = "github.com";
  var TOKEN_COOKIE_NAME = "__github_access_token";
  var cachedToken = null;
  function formatCredentialInput(host, protocol, username, password) {
    const lines = [`protocol=${protocol}`, `host=${host}`];
    if (username) lines.push(`username=${username}`);
    if (password) lines.push(`password=${password}`);
    lines.push("");
    return lines.join("\n");
  }
  function parseCredentialOutput(output) {
    const result = {};
    for (const line of output.split("\n")) {
      const [key, ...valueParts] = line.split("=");
      const value = valueParts.join("=");
      if (key === "username") {
        result.username = value;
      } else if (key === "password") {
        result.password = value;
      }
    }
    return result;
  }
  async function getTokenFromGit(gitPath = "git") {
    try {
      console.log("   Checking git credential helper for GitHub token...");
      const input = formatCredentialInput(GITHUB_HOST, "https");
      const result = await executeBinary({
        binaryPath: gitPath,
        args: ["credential", "fill"],
        stdin: input,
        timeoutMs: 5e3
      });
      if (!result.success) {
        console.log("   No credentials found in git credential helper");
        return null;
      }
      const { password } = parseCredentialOutput(result.stdout);
      if (password) {
        console.log("   Found GitHub token in git credential helper");
        return password;
      }
      console.log("   Git credential helper returned no password");
      return null;
    } catch (error) {
      console.log(`   Git credential helper failed: ${error}`);
      return null;
    }
  }
  async function storeToken(token) {
    try {
      console.log("   Storing GitHub access token...");
      try {
        await setPluginCookie([
          {
            name: TOKEN_COOKIE_NAME,
            value: token,
            domain: GITHUB_HOST
          }
        ]);
        console.log("   Token stored in plugin cookies");
      } catch (error) {
        console.warn(`   Could not store in cookies: ${error}`);
      }
      cachedToken = token;
      console.log("   Token stored successfully");
      return true;
    } catch (error) {
      console.error(`   Error storing token: ${error}`);
      return false;
    }
  }
  async function getToken() {
    if (cachedToken) {
      return cachedToken;
    }
    try {
      const cookies = await getPluginCookie();
      const tokenCookie = cookies?.find((c) => c.name === TOKEN_COOKIE_NAME);
      if (tokenCookie) {
        cachedToken = tokenCookie.value;
        return cachedToken;
      }
    } catch {
    }
    return null;
  }

  // src/auth.ts
  var CLIENT_ID = "Ov23li8HTgRH8nuO16oK";
  var REQUIRED_SCOPES = ["repo"];
  var GITHUB_DEVICE_CODE_URL = "https://github.com/login/device/code";
  var GITHUB_TOKEN_URL = "https://github.com/login/oauth/access_token";
  var GITHUB_API_USER_URL = "https://api.github.com/user";
  var MAX_POLL_TIME_MS = 3e5;
  async function requestDeviceCode() {
    console.log("   Requesting device code from GitHub...");
    const response = await httpPost(
      GITHUB_DEVICE_CODE_URL,
      {
        client_id: CLIENT_ID,
        scope: REQUIRED_SCOPES.join(" ")
      },
      {
        headers: {
          Accept: "application/json",
          Origin: "https://github.com"
        }
      }
    );
    if (!response.ok) {
      throw new Error(`Failed to request device code: ${response.status} ${response.text()}`);
    }
    const data = JSON.parse(response.text());
    if (data.error) {
      throw new Error(`GitHub error: ${data.error_description || data.error}`);
    }
    console.log(`   Device code received. User code: ${data.user_code}`);
    return data;
  }
  async function pollForToken(deviceCode, _interval) {
    const response = await httpPost(
      GITHUB_TOKEN_URL,
      {
        client_id: CLIENT_ID,
        device_code: deviceCode,
        grant_type: "urn:ietf:params:oauth:grant-type:device_code"
      },
      {
        headers: {
          Accept: "application/json",
          Origin: "https://github.com"
        }
      }
    );
    if (!response.ok) {
      throw new Error(`Failed to poll for token: ${response.status} ${response.text()}`);
    }
    return JSON.parse(response.text());
  }
  async function validateToken(token) {
    try {
      const response = await fetch(GITHUB_API_USER_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/vnd.github.v3+json",
          "User-Agent": "moss-GitHub-Deployer"
        }
      });
      if (!response.ok) {
        return { valid: false };
      }
      const user = await response.json();
      const scopeHeader = response.headers.get("X-OAuth-Scopes") || "";
      const scopes = scopeHeader.split(",").map((s) => s.trim()).filter(Boolean);
      return { valid: true, user, scopes };
    } catch {
      return { valid: false };
    }
  }
  function hasRequiredScopes(scopes) {
    return REQUIRED_SCOPES.every((required) => scopes.includes(required));
  }
  async function promptLogin() {
    try {
      await reportProgress2("authentication", 0, 4, "Requesting authorization...");
      const deviceCodeResponse = await requestDeviceCode();
      const userCode = deviceCodeResponse.user_code;
      const browserUrl = deviceCodeResponse.verification_uri_complete ?? deviceCodeResponse.verification_uri;
      await reportProgress2("authentication", 1, 4, `Enter code: ${userCode}`);
      await openBrowserWithHtml(createAuthUiHtml(userCode));
      console.log(`   Opening system browser for GitHub authorization...`);
      console.log(`   Enter code: ${userCode}`);
      await openSystemBrowser(browserUrl);
      let cancelled = false;
      const unlisten = await onEvent("github:auth-cancel", () => {
        cancelled = true;
      });
      try {
        await reportProgress2("authentication", 2, 4, "Waiting for authorization...");
        const token = await waitForToken(
          deviceCodeResponse.device_code,
          deviceCodeResponse.interval,
          deviceCodeResponse.expires_in * 1e3,
          () => cancelled
        );
        if (!token) {
          console.warn("   Authorization timed out or was denied");
          if (!cancelled) {
            await emitAuthState("error", "Authorization timed out or was denied");
            await closeBrowser().catch(() => {
            });
          }
          return false;
        }
        await emitAuthState("success");
        await reportProgress2("authentication", 3, 4, "Storing credentials...");
        const stored = await storeToken(token);
        if (!stored) {
          console.warn("   Failed to store token");
        }
        await reportProgress2("authentication", 4, 4, "Authenticated");
        console.log("   Successfully authenticated with GitHub");
        await closeBrowser();
        return true;
      } finally {
        unlisten();
      }
    } catch (error) {
      console.error(`   Authentication failed: ${error}`);
      await emitAuthState("error", String(error));
      return false;
    }
  }
  async function emitAuthState(phase, error) {
    try {
      const w = window;
      await w.__TAURI__?.event?.emit("github:auth-state", { phase, error });
    } catch {
    }
  }
  function createAuthUiHtml(userCode) {
    return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Authorize moss on GitHub</title>
  <style>
    :root {
      --bg: #0d1117;
      --surface: #161b22;
      --surface-hover: #21262d;
      --text: #e6edf3;
      --text-muted: #8b949e;
      --success: #3fb950;
      --error: #f85149;
      --border: #30363d;
      --link: #58a6ff;
    }

    * { box-sizing: border-box; margin: 0; padding: 0; }

    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      background: var(--bg);
      color: var(--text);
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 40px 24px;
    }

    .container { width: 100%; max-width: 400px; text-align: center; }

    .icon { width: 48px; height: 48px; margin-bottom: 16px; }

    h1 { font-size: 22px; font-weight: 600; margin-bottom: 8px; }

    .subtitle {
      color: var(--text-muted);
      font-size: 14px;
      margin-bottom: 24px;
    }

    .code-display {
      font-family: 'SF Mono', SFMono-Regular, Consolas, 'Liberation Mono', Menlo, monospace;
      font-size: 32px;
      letter-spacing: 0.15em;
      font-weight: 700;
      color: var(--text);
      padding: 20px 24px;
      background: var(--surface);
      border-radius: 8px;
      border: 1px solid var(--border);
      margin-bottom: 16px;
      user-select: all;
    }

    .copy-area { margin-bottom: 32px; }

    .btn-copy {
      padding: 8px 16px;
      font-size: 13px;
      font-weight: 500;
      border-radius: 6px;
      border: 1px solid var(--border);
      background: var(--surface);
      color: var(--text);
      cursor: pointer;
      transition: background-color 0.15s;
    }

    .btn-copy:hover { background: var(--surface-hover); }
    .btn-copy.copied { color: var(--success); border-color: var(--success); }

    .status-area {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      margin-bottom: 24px;
      min-height: 24px;
    }

    .spinner {
      width: 16px;
      height: 16px;
      border: 2px solid var(--border);
      border-top-color: var(--link);
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
    }

    @keyframes spin { to { transform: rotate(360deg); } }

    #status-text { color: var(--text-muted); font-size: 14px; }
    #status-text.success { color: var(--success); }
    #status-text.error { color: var(--error); }

    .btn-cancel {
      padding: 10px 20px;
      font-size: 14px;
      font-weight: 500;
      border-radius: 6px;
      border: 1px solid var(--border);
      background: var(--surface);
      color: var(--text);
      cursor: pointer;
      transition: background-color 0.15s;
    }

    .btn-cancel:hover { background: var(--surface-hover); }

    .hidden { display: none; }
  </style>
</head>
<body>
  <div class="container">
    <svg class="icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2C6.475 2 2 6.475 2 12c0 4.42 2.865 8.17 6.84 9.49.5.09.68-.22.68-.48v-1.69c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02.8-.22 1.65-.33 2.5-.33.85 0 1.7.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.94.36.31.68.92.68 1.85v2.75c0 .27.18.58.69.48C19.14 20.17 22 16.42 22 12c0-5.525-4.475-10-10-10z" fill="#8b949e"/>
    </svg>

    <h1>Authorize moss on GitHub</h1>
    <p class="subtitle">Enter this code in your browser</p>

    <div class="code-display" id="user-code">${userCode}</div>

    <div class="copy-area">
      <button class="btn-copy" id="copy-btn">Copy code</button>
    </div>

    <div class="status-area">
      <div class="spinner" id="spinner"></div>
      <span id="status-text">Waiting for authorization...</span>
    </div>

    <button class="btn-cancel" id="cancel-btn">Cancel</button>
  </div>

  <script>
    const copyBtn = document.getElementById('copy-btn');
    const cancelBtn = document.getElementById('cancel-btn');
    const spinner = document.getElementById('spinner');
    const statusText = document.getElementById('status-text');
    const userCode = ${JSON.stringify(userCode)};

    copyBtn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(userCode);
      } catch {
        const ta = document.createElement('textarea');
        ta.value = userCode;
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
      }
      copyBtn.textContent = 'Copied!';
      copyBtn.classList.add('copied');
      setTimeout(() => {
        copyBtn.textContent = 'Copy code';
        copyBtn.classList.remove('copied');
      }, 2000);
    });

    cancelBtn.addEventListener('click', () => {
      mossApi.emit('github:auth-cancel', {});
      mossApi.close();
    });

    const { event } = window.__TAURI__;
    event.listen('github:auth-state', (e) => {
      const { phase, error } = e.payload;
      if (phase === 'success') {
        spinner.classList.add('hidden');
        statusText.textContent = 'Authenticated!';
        statusText.className = 'success';
        cancelBtn.classList.add('hidden');
      } else if (phase === 'error') {
        spinner.classList.add('hidden');
        statusText.textContent = error || 'Authorization failed';
        statusText.className = 'error';
      }
    });
  <\/script>
</body>
</html>`;
  }
  async function waitForToken(deviceCode, initialInterval, maxWaitMs, isCancelled = () => false) {
    const startTime = Date.now();
    let interval = initialInterval;
    while (Date.now() - startTime < Math.min(maxWaitMs, MAX_POLL_TIME_MS)) {
      if (isCancelled()) return null;
      await sleep(interval * 1e3);
      if (isCancelled()) return null;
      try {
        const response = await pollForToken(deviceCode, interval);
        if (response.access_token) {
          return response.access_token;
        }
        if (response.error === "authorization_pending") {
          continue;
        }
        if (response.error === "slow_down") {
          interval += 5;
          console.log(`   Slowing down, new interval: ${interval}s`);
          continue;
        }
        if (response.error === "expired_token") {
          console.warn("   Device code expired");
          return null;
        }
        if (response.error === "access_denied") {
          console.warn("   User denied authorization");
          return null;
        }
        console.error(`   Unexpected error: ${response.error}`);
        return null;
      } catch (error) {
        console.error(`   Poll error: ${error}`);
      }
    }
    console.warn("   Authorization timeout");
    return null;
  }

  // src/constants.ts
  var DEPLOY_HEARTBEAT_INTERVAL_MS = 1e4;

  // src/repo-setup.ts
  async function ensureGitHubRepo() {
    console.log("   Ensuring GitHub repository...");
    const token = await ensureAuthenticated();
    if (!token) {
      return null;
    }
    let username;
    try {
      const user = await getAuthenticatedUser(token);
      username = user.login;
      console.log(`   Authenticated as ${username}`);
    } catch (error) {
      console.error(`   Failed to get user info: ${error}`);
      return null;
    }
    const rootRepoName = `${username}.github.io`;
    const rootExists = await checkRepoExists(username, rootRepoName, token);
    if (!rootExists) {
      return await createRootRepo(username, rootRepoName, token);
    } else {
      const choice = await showDeployChoiceUI(username, token);
      if (!choice) {
        await closeBrowser();
        return null;
      }
      if (choice.action === "replace-root") {
        const sshUrl = await getRepoSshUrl(username, rootRepoName, token);
        await closeBrowser();
        return { name: rootRepoName, sshUrl, fullName: `${username}/${rootRepoName}` };
      } else {
        const createdRepo = await createRepository(choice.repoName, token, "Created with moss");
        await closeBrowser();
        return { name: createdRepo.name, sshUrl: createdRepo.sshUrl, fullName: createdRepo.fullName };
      }
    }
  }
  async function ensureAuthenticated() {
    let token = await getToken();
    if (token) {
      return token;
    }
    console.log("   No cached token, checking git credentials...");
    token = await getTokenFromGit();
    if (token) {
      const validation = await validateToken(token);
      if (validation.valid && hasRequiredScopes(validation.scopes || [])) {
        console.log(`   Using token from git credentials (${validation.user?.login})`);
        await storeToken(token);
        return token;
      } else {
        console.log("   Git credential token invalid or missing scopes");
      }
    }
    console.log("   No valid credentials found, prompting login...");
    const loginSuccess = await promptLogin();
    if (!loginSuccess) {
      console.warn("   GitHub login cancelled or failed");
      return null;
    }
    token = await getToken();
    if (!token) {
      console.error("   Failed to get token after login");
      return null;
    }
    return token;
  }
  async function createRootRepo(_username, repoName, token) {
    console.log(`   Auto-creating ${repoName} (will deploy to root URL)...`);
    try {
      const createdRepo = await createRepository(repoName, token, "Created with moss");
      console.log(`   Repository created: ${createdRepo.htmlUrl}`);
      return {
        name: createdRepo.name,
        sshUrl: createdRepo.sshUrl,
        fullName: createdRepo.fullName
      };
    } catch (error) {
      console.error(`   Failed to create repository: ${error}`);
      return null;
    }
  }
  async function showBrowserWithProgress(html, eventName, progressMessage, timeoutMs = 3e5) {
    const heartbeat = setInterval(async () => {
      await reportProgress2("setup", 0, 6, progressMessage);
    }, DEPLOY_HEARTBEAT_INTERVAL_MS);
    let unlisten = null;
    try {
      await openBrowserWithHtml(html);
      return await Promise.race([
        // Wait for event
        new Promise(async (resolve) => {
          unlisten = await onEvent(eventName, (payload) => {
            resolve(payload);
            return payload;
          });
        }),
        // Timeout
        new Promise((resolve) => {
          setTimeout(() => resolve(null), timeoutMs);
        })
      ]);
    } catch (error) {
      console.error(`   Form display error: ${error}`);
      return null;
    } finally {
      clearInterval(heartbeat);
      if (unlisten != null) {
        unlisten();
      }
    }
  }
  async function showDeployChoiceUI(username, token) {
    console.log("   Root repo already exists, showing deploy choice UI...");
    const html = createDeployChoiceHtml(username, token);
    return await showBrowserWithProgress(
      html,
      "github:deploy-choice",
      "Setting up GitHub repository...",
      3e5
    );
  }
  function createDeployChoiceHtml(username, token) {
    const rootRepoName = `${username}.github.io`;
    return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>GitHub Repository Setup</title>
  <style>
    :root {
      --bg: #0d1117;
      --surface: #161b22;
      --surface-hover: #21262d;
      --text: #e6edf3;
      --text-muted: #8b949e;
      --primary: #238636;
      --primary-hover: #2ea043;
      --success: #3fb950;
      --error: #f85149;
      --warning: #d29922;
      --border: #30363d;
      --link: #58a6ff;
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      background: var(--bg);
      color: var(--text);
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 40px 24px;
    }

    .container {
      width: 100%;
      max-width: 480px;
    }

    .icon {
      width: 48px;
      height: 48px;
      margin-bottom: 16px;
    }

    h1 {
      font-size: 24px;
      font-weight: 600;
      margin-bottom: 8px;
    }

    .subtitle {
      color: var(--text-muted);
      font-size: 14px;
      margin-bottom: 24px;
      line-height: 1.5;
    }

    .info-box {
      padding: 12px 16px;
      background: rgba(210, 153, 34, 0.1);
      border: 1px solid var(--warning);
      border-radius: 6px;
      font-size: 13px;
      color: var(--warning);
      margin-bottom: 24px;
      line-height: 1.5;
    }

    .info-box code {
      background: rgba(210, 153, 34, 0.2);
      padding: 2px 6px;
      border-radius: 3px;
      font-family: monospace;
    }

    .card {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 8px;
      padding: 20px;
      margin-bottom: 16px;
      transition: border-color 0.15s;
    }

    .card:hover {
      border-color: var(--text-muted);
    }

    .card h2 {
      font-size: 16px;
      font-weight: 600;
      margin-bottom: 6px;
    }

    .card p {
      color: var(--text-muted);
      font-size: 13px;
      line-height: 1.5;
      margin-bottom: 16px;
    }

    .card code {
      background: rgba(88, 166, 255, 0.1);
      padding: 2px 6px;
      border-radius: 3px;
      font-family: monospace;
      color: var(--link);
    }

    .form-group {
      margin-bottom: 16px;
    }

    label {
      display: block;
      font-size: 14px;
      font-weight: 500;
      margin-bottom: 8px;
    }

    .input-wrapper {
      display: flex;
      align-items: center;
      background: var(--bg);
      border: 1px solid var(--border);
      border-radius: 6px;
      overflow: hidden;
      transition: border-color 0.15s;
    }

    .input-wrapper:focus-within {
      border-color: var(--link);
    }

    .input-wrapper.error {
      border-color: var(--error);
    }

    .input-wrapper.success {
      border-color: var(--success);
    }

    .prefix {
      padding: 10px 0 10px 12px;
      color: var(--text-muted);
      font-size: 14px;
      white-space: nowrap;
    }

    input[type="text"] {
      flex: 1;
      padding: 10px 12px 10px 4px;
      font-size: 14px;
      background: transparent;
      border: none;
      color: var(--text);
      outline: none;
    }

    input[type="text"]::placeholder {
      color: var(--text-muted);
    }

    .status {
      display: flex;
      align-items: center;
      gap: 6px;
      margin-top: 8px;
      font-size: 13px;
      min-height: 20px;
    }

    .status.checking {
      color: var(--text-muted);
    }

    .status.available {
      color: var(--success);
    }

    .status.taken,
    .status.invalid {
      color: var(--error);
    }

    .spinner {
      width: 14px;
      height: 14px;
      border: 2px solid var(--border);
      border-top-color: var(--link);
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }

    button {
      padding: 10px 20px;
      font-size: 14px;
      font-weight: 500;
      border-radius: 6px;
      border: none;
      cursor: pointer;
      transition: background-color 0.15s;
    }

    button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .btn-primary {
      background: var(--primary);
      color: white;
      width: 100%;
    }

    .btn-primary:hover:not(:disabled) {
      background: var(--primary-hover);
    }

    .btn-secondary {
      background: var(--surface-hover);
      color: var(--text);
      border: 1px solid var(--border);
      width: 100%;
    }

    .btn-secondary:hover:not(:disabled) {
      background: var(--border);
    }

    .cancel-row {
      text-align: center;
      margin-top: 16px;
    }

    .cancel-link {
      color: var(--text-muted);
      font-size: 13px;
      cursor: pointer;
      background: none;
      border: none;
      text-decoration: underline;
      padding: 0;
      width: auto;
    }

    .cancel-link:hover {
      color: var(--text);
    }
  </style>
</head>
<body>
  <div class="container">
    <svg class="icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2C6.475 2 2 6.475 2 12c0 4.42 2.865 8.17 6.84 9.49.5.09.68-.22.68-.48v-1.69c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02.8-.22 1.65-.33 2.5-.33.85 0 1.7.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.94.36.31.68.92.68 1.85v2.75c0 .27.18.58.69.48C19.14 20.17 22 16.42 22 12c0-5.525-4.475-10-10-10z" fill="#8b949e"/>
    </svg>

    <h1>Deploy your site</h1>
    <p class="subtitle">
      <code>${rootRepoName}</code> already exists. How would you like to deploy?
    </p>

    <!-- Card 1: Replace root -->
    <div class="card" id="card-replace">
      <h2>Replace it</h2>
      <p>
        Deploy to your existing <code>${rootRepoName}</code> repository.
        Your site will be at <strong>${username}.github.io/</strong>
      </p>
      <button class="btn-primary" id="replace-btn">Deploy to ${username}.github.io</button>
    </div>

    <!-- Card 2: Custom domain / project repo -->
    <div class="card" id="card-custom">
      <h2>Use a custom domain</h2>
      <p>
        Create a new repository and set up a custom domain later.
        Your site will be at <strong>${username}.github.io/<em>repo-name</em>/</strong> until the domain is configured.
      </p>

      <div class="form-group">
        <label for="repo-name">Repository name</label>
        <div class="input-wrapper" id="input-wrapper">
          <span class="prefix">github.com/${username}/</span>
          <input type="text" id="repo-name" placeholder="my-website"
                 autocomplete="off" autocorrect="off" spellcheck="false">
        </div>
        <div class="status" id="status"></div>
      </div>

      <button class="btn-secondary" id="custom-btn" disabled>Create & Deploy</button>
    </div>

    <div class="cancel-row">
      <button class="cancel-link" id="cancel-btn">Cancel</button>
    </div>
  </div>

  <script>
    const token = '${token}';

    const input = document.getElementById('repo-name');
    const inputWrapper = document.getElementById('input-wrapper');
    const status = document.getElementById('status');
    const replaceBtn = document.getElementById('replace-btn');
    const customBtn = document.getElementById('custom-btn');
    const cancelBtn = document.getElementById('cancel-btn');

    let checkTimeout = null;
    let isAvailable = false;
    let currentName = '';

    const validNameRegex = /^[a-zA-Z0-9._-]+$/;

    function setStatus(type, message) {
      status.className = 'status ' + type;

      if (type === 'checking') {
        status.innerHTML = '<div class="spinner"></div>' + message;
      } else if (type === 'available') {
        status.innerHTML = '<span>\u2713</span> ' + message;
      } else if (type === 'taken' || type === 'invalid') {
        status.innerHTML = '<span>\u2717</span> ' + message;
      } else {
        status.innerHTML = message;
      }

      inputWrapper.className = 'input-wrapper ' +
        (type === 'available' ? 'success' :
         (type === 'taken' || type === 'invalid') ? 'error' : '');

      customBtn.disabled = type !== 'available';
      isAvailable = type === 'available';
    }

    function validateName(name) {
      if (!name) {
        setStatus('', '');
        return false;
      }

      if (name.startsWith('.')) {
        setStatus('invalid', 'Name cannot start with a period');
        return false;
      }

      if (!validNameRegex.test(name)) {
        setStatus('invalid', 'Only letters, numbers, hyphens, underscores, and periods allowed');
        return false;
      }

      if (name.length > 100) {
        setStatus('invalid', 'Name is too long (max 100 characters)');
        return false;
      }

      return true;
    }

    async function checkAvailability(name) {
      if (!validateName(name)) return;

      currentName = name;
      setStatus('checking', 'Checking availability...');

      try {
        const response = await fetch('https://api.github.com/repos/${username}/' + name, {
          headers: {
            'Accept': 'application/vnd.github.v3+json',
            'Authorization': 'Bearer ' + token
          }
        });

        if (name !== currentName) return;

        if (response.status === 404) {
          setStatus('available', 'Name is available');
        } else if (response.ok) {
          setStatus('taken', 'Repository already exists');
        } else {
          setStatus('invalid', 'Error checking availability');
        }
      } catch (error) {
        if (name !== currentName) return;
        setStatus('invalid', 'Error checking availability');
      }
    }

    input.addEventListener('input', (e) => {
      const name = e.target.value.trim();

      if (checkTimeout) {
        clearTimeout(checkTimeout);
      }

      if (!validateName(name)) return;

      checkTimeout = setTimeout(() => {
        checkAvailability(name);
      }, 300);
    });

    replaceBtn.addEventListener('click', () => {
      replaceBtn.disabled = true;
      replaceBtn.innerHTML = '<span style="display:flex;align-items:center;justify-content:center;gap:8px"><span class="spinner"></span>Connecting...</span>';
      mossApi.emit('github:deploy-choice', { action: 'replace-root' });
    });

    customBtn.addEventListener('click', () => {
      if (!isAvailable) return;
      const name = input.value.trim();
      customBtn.disabled = true;
      customBtn.innerHTML = '<span style="display:flex;align-items:center;justify-content:center;gap:8px"><span class="spinner"></span>Creating...</span>';
      mossApi.emit('github:deploy-choice', { action: 'custom-domain', repoName: name });
    });

    cancelBtn.addEventListener('click', () => {
      mossApi.close();
    });
  <\/script>
</body>
</html>`;
  }

  // src/main.ts
  var GITHUB_PAGES_IPS = [
    "185.199.108.153",
    "185.199.109.153",
    "185.199.110.153",
    "185.199.111.153"
  ];
  function generateDnsTarget(owner) {
    const records = [
      // A records for apex domain (@)
      ...GITHUB_PAGES_IPS.map((ip) => ({
        record_type: "A",
        name: "@",
        value: ip
      })),
      // CNAME for www subdomain
      {
        record_type: "CNAME",
        name: "www",
        value: `${owner}.github.io`
      }
    ];
    return { records };
  }
  async function waitForPagesLive(owner, repo, token, pagesUrl, expectedCommit) {
    if (!token) {
      console.log("   Status check skipped (no token available)");
      return { isLive: false, url: pagesUrl };
    }
    const maxAttempts = 6;
    const pollInterval = 5e3;
    let buildRequested = false;
    console.log("   Checking deployment status...");
    for (let i = 0; i < maxAttempts; i++) {
      await reportProgress2("verifying", 9, 10, `Waiting for GitHub Pages... (${i + 1}/${maxAttempts})`);
      const status = await checkPagesStatus(owner, repo, token);
      if (status.status === "built") {
        if (expectedCommit && status.commit && status.commit !== expectedCommit) {
          console.log(`   Stale build detected (got ${status.commit}, expected ${expectedCommit})`);
          if (!buildRequested) {
            buildRequested = true;
            console.log("   Requesting rebuild...");
            await requestPagesBuild(owner, repo, token);
          }
        } else {
          console.log("   Site is live!");
          return { isLive: true, url: pagesUrl };
        }
      }
      if (status.status === "errored") {
        console.log("   Build failed on GitHub");
        return { isLive: false, url: pagesUrl, error: status.error };
      }
      if (i < maxAttempts - 1) {
        await new Promise((resolve) => setTimeout(resolve, pollInterval));
      }
    }
    console.log("   Status check timed out (site may still be building)");
    return { isLive: false, url: pagesUrl };
  }
  async function checkSiteReachable(url, maxAttempts = 3, intervalMs = 5e3) {
    for (let i = 0; i < maxAttempts; i++) {
      await reportProgress2("verifying", 9, 10, `Checking ${url}... (${i + 1}/${maxAttempts})`);
      try {
        const result = await fetchUrl(url, { timeoutMs: 1e4 });
        if (result.ok) return true;
      } catch {
      }
      if (i < maxAttempts - 1) {
        await new Promise((resolve) => setTimeout(resolve, intervalMs));
      }
    }
    return false;
  }
  async function deploy(context) {
    setCurrentHookName("deploy");
    console.log("GitHub Deployer: Starting deployment...");
    await reportProgress2("configuring", 1, 10, "Checking git...");
    let gitPath;
    try {
      gitPath = await getTauriCore().invoke("resolve_git_path");
    } catch (e) {
      const msg = `Git is required for deployment. ${e instanceof Error ? e.message : String(e)}

Install git by running: xcode-select --install`;
      await reportError2(msg, "validation", true);
      return { success: false, message: msg };
    }
    console.log(`   Using git: ${gitPath}`);
    try {
      if (!context.site_files || context.site_files.length === 0) {
        const msg = "Site directory is empty. Please build your site first.";
        await reportError2(msg, "validation", true);
        return { success: false, message: msg };
      }
      console.log(`   Site files: ${context.site_files.length} files ready`);
      let owner;
      let repoName;
      let wasFirstSetup = false;
      const existing = await getOriginOwnerRepo(gitPath);
      if (existing) {
        owner = existing.owner;
        repoName = existing.repo;
        console.log(`   Deploy target: ${owner}/${repoName} (from git origin)`);
      } else {
        await reportProgress2("setup", 0, 10, "Setting up GitHub repository...");
        const repoInfo = await ensureGitHubRepo();
        if (!repoInfo) {
          return { success: false, message: "Repository setup cancelled." };
        }
        const parsed = parseGitHubUrl(repoInfo.sshUrl);
        if (!parsed) {
          throw new Error("Could not parse GitHub URL from setup result: " + repoInfo.sshUrl);
        }
        owner = parsed.owner;
        repoName = parsed.repo;
        wasFirstSetup = true;
        console.log(`   Repository configured: ${repoInfo.fullName}`);
        await closeBrowser2();
        console.log("   Browser closed - continuing deployment in background");
      }
      await reportProgress2("configuring", 3, 10, "Checking authentication...");
      let token = await getToken();
      if (!token) {
        const gitToken = await getTokenFromGit(gitPath);
        if (gitToken) {
          const validation = await validateToken(gitToken);
          if (validation.valid && hasRequiredScopes(validation.scopes || [])) {
            await storeToken(gitToken);
            token = gitToken;
          } else {
            console.log("   Git credential token invalid or lacks required scopes");
          }
        }
        if (!token) {
          await reportProgress2("authenticating", 3, 10, "Authentication required...");
          const authResult = await promptLogin();
          if (!authResult) {
            return { success: false, message: "Authentication required for deployment. Please try again." };
          }
          token = await getToken();
          if (!token) {
            return { success: false, message: "Authentication failed. No valid token available." };
          }
        }
      }
      await verifyRepoExists(owner, repoName, token);
      let deployResult = { commitSha: "", orphanSha: "", treeChanged: false };
      let currentPhase = "Deploying...";
      let currentStep = 5;
      let postDeployPhase = false;
      const heartbeat = setInterval(() => {
        const stage = postDeployPhase ? "verifying" : "deploying";
        reportProgress2(stage, currentStep, 10, currentPhase);
      }, DEPLOY_HEARTBEAT_INTERVAL_MS);
      let domain = context.domain;
      if (!domain) {
        try {
          const pages = await getPages(owner, repoName, token);
          if (pages?.cname) {
            domain = pages.cname;
            console.log(`   Safety net: preserving existing GitHub Pages CNAME: ${domain}`);
          }
        } catch {
        }
      }
      try {
        deployResult = await deployViaGitPush({
          owner,
          repo: repoName,
          token,
          gitPath,
          domain,
          onProgress: (percent, message2) => {
            currentPhase = message2;
            if (percent >= 100) {
              postDeployPhase = true;
              currentStep = 10;
              reportProgress2("verifying", currentStep, 10, message2);
            } else {
              currentStep = Math.min(5 + Math.floor(percent / 100 * 4), 9);
              reportProgress2("deploying", currentStep, 10, message2);
            }
          }
        });
      } finally {
        clearInterval(heartbeat);
      }
      try {
        const pagesResult = await ensurePagesSource(owner, repoName, token, "gh-pages");
        if (!pagesResult.configured) {
          console.warn("Failed to configure GitHub Pages source \u2014 user may need to enable Pages manually");
        }
      } catch (e) {
        console.warn(`   Failed to configure Pages source: ${e instanceof Error ? e.message : String(e)}`);
      }
      const pagesUrl = buildPagesUrl(owner, repoName);
      const displayUrl = domain ? `https://${domain}` : pagesUrl;
      const { commitSha, orphanSha, treeChanged } = deployResult;
      const deployed = treeChanged;
      if (deployed) {
        console.log(`   Deployed: ${orphanSha.substring(0, 7)}`);
        console.log(`   Site URL: ${displayUrl}`);
      } else {
        console.log("   No changes to deploy");
        console.log(`   Site URL: ${displayUrl}`);
      }
      let isLive = false;
      let liveError;
      if (deployed) {
        const liveStatus = await waitForPagesLive(owner, repoName, token, pagesUrl, orphanSha);
        liveError = liveStatus.error;
        if (liveStatus.isLive) {
          isLive = await checkSiteReachable(displayUrl);
        } else if (!liveError) {
          isLive = await checkSiteReachable(displayUrl, 2, 3e3);
        }
      }
      const dnsTarget = generateDnsTarget(owner);
      let message;
      let toastMessage;
      let toastVariant;
      let toastActions;
      if (wasFirstSetup && deployed) {
        message = `Your site is being deployed to GitHub Pages!

Your site will be available at: ${displayUrl}

GitHub Pages is automatically enabled for the gh-pages branch.
It may take a few minutes for your site to appear.`;
        toastMessage = "Deploy configured!";
        toastVariant = "success";
        toastActions = [{ label: "View site", url: displayUrl }];
      } else if (deployed && isLive) {
        message = `Site deployed to GitHub Pages!

Your site: ${displayUrl}

Changes have been pushed to gh-pages branch.`;
        toastMessage = "Site is live!";
        toastVariant = "success";
        toastActions = [{ label: "View site", url: displayUrl }];
      } else if (deployed && liveError) {
        message = `Site pushed to GitHub Pages but the build failed.

Error: ${liveError}

Check GitHub Pages settings for details.`;
        toastMessage = liveError.length > 60 ? liveError.slice(0, 60) + "..." : liveError;
        toastVariant = "warning";
        toastActions = [{ label: "View on GitHub", url: `https://github.com/${owner}/${repoName}/settings/pages` }];
      } else if (deployed) {
        message = `Site deployed to GitHub Pages!

Your site: ${displayUrl}

Changes have been pushed. It may take a moment to go live.`;
        toastMessage = "Deployed \u2014 may take a moment to go live";
        toastVariant = "info";
        toastActions = [{ label: "View site", url: displayUrl }];
      } else {
        message = `No changes to deploy.

Your site: ${displayUrl}

Your local site is already up to date.`;
        toastMessage = "No changes to deploy";
        toastVariant = "info";
        toastActions = [{ label: "View site", url: displayUrl }];
      }
      const progressMsg = wasFirstSetup ? "GitHub Pages configured!" : deployed ? "Deployed!" : "No changes to deploy";
      await reportProgress2("complete", 10, 10, progressMsg);
      const logMsg = wasFirstSetup ? "Setup complete" : deployed ? "Changes pushed" : "No changes";
      console.log(`GitHub Deployer: ${logMsg}`);
      await showToast2({
        message: toastMessage,
        variant: toastVariant,
        actions: toastActions,
        duration: 8e3
      });
      return {
        success: true,
        message,
        deployment: {
          method: "github-pages",
          url: displayUrl,
          deployed_at: (/* @__PURE__ */ new Date()).toISOString(),
          metadata: {
            repo_url: `https://github.com/${owner}/${repoName}`,
            branch: "gh-pages",
            was_first_setup: String(wasFirstSetup),
            commit_sha: commitSha,
            is_live: String(isLive)
          },
          dns_target: dnsTarget
        }
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      await reportError2(errorMessage, "deploy", true);
      console.error(`GitHub Deployer: Failed - ${errorMessage}`);
      const lowerError = errorMessage.toLowerCase();
      let toastMessage;
      if (lowerError.includes("timed out") || lowerError.includes("timeout")) {
        toastMessage = "Push may still be running. Check GitHub in a few minutes.";
      } else if (lowerError.includes("authentication") || lowerError.includes("auth") || lowerError.includes("token")) {
        toastMessage = "Authentication failed";
      } else if (lowerError.includes("network") || lowerError.includes("connection")) {
        toastMessage = "Network error";
      } else if (lowerError.includes("not a git repository") || lowerError.includes("no remote")) {
        toastMessage = "Git not configured";
      } else if (errorMessage.length > 50) {
        toastMessage = errorMessage.slice(0, 50) + "...";
      } else {
        toastMessage = errorMessage;
      }
      await showToast2({
        message: toastMessage,
        variant: "error",
        duration: 5e3
      });
      return { success: false, message: errorMessage };
    }
  }
  async function configure_domain(context) {
    setCurrentHookName("configure_domain");
    const { domain } = context;
    console.log(`GitHub Deployer: Configuring custom domain "${domain}"...`);
    try {
      let gitPath;
      try {
        gitPath = await getTauriCore().invoke("resolve_git_path");
      } catch (e) {
        console.log(`   Git resolution failed, falling back to system git: ${e instanceof Error ? e.message : String(e)}`);
        gitPath = "git";
      }
      const repoConfig = await getOriginOwnerRepo(gitPath);
      if (!repoConfig) {
        return {
          success: false,
          message: "No GitHub repository configured. Deploy first."
        };
      }
      const { owner, repo } = repoConfig;
      let token = await getToken();
      if (!token) {
        token = await getTokenFromGit(gitPath);
        if (token) {
          await storeToken(token);
        }
      }
      if (!token) {
        return {
          success: false,
          message: "No GitHub authentication token available. Please deploy first to authenticate."
        };
      }
      const pages = await getPages(owner, repo, token);
      if (!pages) {
        return {
          success: false,
          message: "GitHub Pages not enabled. Deploy first."
        };
      }
      if (!pages.cname || pages.cname.toLowerCase() !== domain.toLowerCase()) {
        console.log(`   Setting CNAME to "${domain}" on ${owner}/${repo}...`);
        await setCustomDomain(owner, repo, token, domain);
        console.log(`   Custom domain "${domain}" configured on GitHub Pages`);
        return {
          success: true,
          message: `Custom domain "${domain}" set on GitHub Pages. HTTPS will be enforced after certificate provisioning.`
        };
      }
      if (!pages.https_enforced) {
        console.log(`   CNAME already set. Enforcing HTTPS...`);
        const enforced = await enforceHttps(owner, repo, token);
        if (enforced) {
          console.log(`   HTTPS enforced for "${domain}"`);
          return { success: true, message: `HTTPS enforced for "${domain}" on GitHub Pages.` };
        } else {
          console.log(`   HTTPS enforcement not yet available (certificate pending)`);
          return { success: true, message: `CNAME set. HTTPS pending certificate provisioning.` };
        }
      }
      console.log(`   Domain "${domain}" already fully configured with HTTPS`);
      return { success: true, message: `Domain "${domain}" already configured with HTTPS on GitHub Pages.` };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      console.error(`GitHub Deployer: Failed to configure domain - ${errorMessage}`);
      return {
        success: false,
        message: `Failed to set custom domain on GitHub Pages: ${errorMessage}`
      };
    }
  }
  var GithubPlugin = {
    deploy,
    configure_domain
  };
  window.GithubPlugin = GithubPlugin;
  var main_default = GithubPlugin;
  return __toCommonJS(main_exports);
})();

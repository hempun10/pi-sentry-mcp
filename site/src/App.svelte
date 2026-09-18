<script>
  import { onMount } from "svelte";

  const install = "pi install npm:pi-sentry-mcp";
  const tagline = "Your agent can read the crash. Then it can open the file.";

  let menuOpen = $state(false);
  let copied = $state(false);
  let tagOn = $state(0);

  const words = tagline.split(" ");

  async function copyInstall() {
    await navigator.clipboard.writeText(install);
    copied = true;
    window.setTimeout(() => {
      copied = false;
    }, 1800);
  }

  onMount(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const reveals = document.querySelectorAll(".reveal");
    if (reduce) {
      reveals.forEach((node) => node.classList.add("in"));
      tagOn = words.length;
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.2 },
    );
    reveals.forEach((node) => io.observe(node));

    const tag = document.getElementById("tagline");
    const tagIo = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) return;
        let i = 0;
        const tick = () => {
          i += 1;
          tagOn = i;
          if (i < words.length) window.setTimeout(tick, 90);
        };
        tick();
        tagIo.disconnect();
      },
      { threshold: 0.4 },
    );
    if (tag) tagIo.observe(tag);

    return () => {
      io.disconnect();
      tagIo.disconnect();
    };
  });
</script>

<a class="skip" href="#main">Skip to content</a>

<nav class="island" aria-label="Primary">
  <a class="brand" href="#main" aria-current="page">pi-sentry-mcp</a>
  <div class="island-links">
    <a href="#how">How it works</a>
    <a href="https://www.npmjs.com/package/pi-sentry-mcp">npm</a>
    <a href="https://github.com/hempun10/pi-sentry-mcp">GitHub</a>
  </div>
  <button
    class="menu-btn"
    type="button"
    aria-expanded={menuOpen}
    aria-controls="mobile-menu"
    aria-label={menuOpen ? "Close menu" : "Open menu"}
    onclick={() => (menuOpen = !menuOpen)}
  >
    <span></span>
    <span></span>
  </button>
</nav>

<div id="mobile-menu" class="overlay" class:open={menuOpen}>
  <a href="#how" onclick={() => (menuOpen = false)}>How it works</a>
  <a href="https://www.npmjs.com/package/pi-sentry-mcp">npm</a>
  <a href="https://github.com/hempun10/pi-sentry-mcp">GitHub</a>
</div>

<main id="main">
  <div class="wrap">
    <section class="hero">
      <div class="hero-copy">
        <h1>Read Sentry issues<br />from inside Pi</h1>
        <p>
          Install the package, sign in once, then ask Pi about crashes, traces,
          and Seer. Sentry runs the tools. This package connects.
        </p>
        <div class="hero-actions">
          <button class="btn" type="button" onclick={copyInstall}>
            <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <rect x="5" y="5" width="8" height="9" rx="1.5" stroke="currentColor" />
              <path d="M3 11V3.5A1.5 1.5 0 0 1 4.5 2H11" stroke="currentColor" />
            </svg>
            {copied ? "Copied" : "Copy install command"}
          </button>
          <p class="proof-line">MIT on npm. Token stays in pi-mcp-adapter.</p>
        </div>
      </div>
      <div class="terminal" aria-label="Install and search example">
        <pre>{`pi install npm:pi-mcp-adapter
pi install npm:pi-sentry-mcp
/reload
/mcp-auth sentry

mcp({ search: "unresolved issues", server: "sentry" })`}</pre>
      </div>
    </section>

    <section class="section reveal" aria-label="Tagline">
      <p class="tagline" id="tagline">
        {#each words as word, index}
          <span class:on={index < tagOn}>{word} </span>
        {/each}
      </p>
    </section>

    <section class="section reveal">
      <h2>The crash is in Sentry. The file is in this repo.</h2>
      <p>
        You should not paste stack traces by hand. Point Pi at Sentry MCP, then
        ask it to explain PROJECT-123 or a Sentry URL. It searches issues,
        events, and traces on Sentry's server.
      </p>
    </section>

    <section class="section reveal">
      <h2>What you get</h2>
      <ul class="benefits">
        <li>
          <strong>Stay in the session.</strong>
          Ask about an issue while you still have the code open. No extra Sentry
          UI tab for the first look.
        </li>
        <li>
          <strong>Sentry owns the tools.</strong>
          search_issues, search_events, Seer, and the rest live at
          mcp.sentry.dev. This package registers that URL.
        </li>
        <li>
          <strong>Scope when you want.</strong>
          Default is every org you can access. Set organization and project in
          settings to pin one.
        </li>
        <li>
          <strong>Auth stays out of the repo.</strong>
          OAuth runs through pi-mcp-adapter. This package never stores the
          token.
        </li>
      </ul>
    </section>

    <section id="how" class="section reveal">
      <h2>How it works</h2>
      <ol class="steps">
        <li>
          Install pi-mcp-adapter and pi-sentry-mcp, then reload Pi.
        </li>
        <li>
          Run /mcp-auth sentry and sign in in the browser.
        </li>
        <li>
          Ask Pi about unresolved issues, a Sentry URL, or a Seer pass.
        </li>
      </ol>
    </section>

    <section class="section reveal">
      <h2>Proof</h2>
      <p>
        Published as pi-sentry-mcp on npm with the pi-package keyword. Source
        and MIT license are on GitHub. No paid plan. Cancel by uninstalling.
      </p>
    </section>

    <section class="section reveal">
      <h2>Questions</h2>
      <div class="faq">
        <details>
          <summary>Does this implement Sentry tools?</summary>
          <p>
            No. Sentry's hosted MCP implements search_issues and the rest. This
            package points Pi at that server.
          </p>
        </details>
        <details>
          <summary>What do I need installed?</summary>
          <p>Pi, pi-mcp-adapter, this package, and a Sentry account.</p>
        </details>
        <details>
          <summary>Where does the token live?</summary>
          <p>
            pi-mcp-adapter stores OAuth. This repo never sees it. Do not commit
            settings dumps.
          </p>
        </details>
        <details>
          <summary>Can I pin one project?</summary>
          <p>
            Yes. Set sentryMcp.organization and sentryMcp.project in
            .pi/settings.json or ~/.pi/agent/settings.json. Project settings
            win. You can also set SENTRY_ORG and SENTRY_PROJECT.
          </p>
        </details>
        <details>
          <summary>Does it work with self hosted Sentry?</summary>
          <p>
            Set sentryMcp.url to your MCP endpoint. This default URL is
            mcp.sentry.dev.
          </p>
        </details>
        <details>
          <summary>Is it free?</summary>
          <p>The package is MIT. Sentry usage follows your Sentry plan.</p>
        </details>
      </div>
    </section>

    <section class="section reveal">
      <div class="final">
        <h2>Install it and ask about the crash</h2>
        <p class="install">{install}</p>
        <div class="hero-actions">
          <button class="btn" type="button" onclick={copyInstall}>
            {copied ? "Copied" : "Copy install command"}
          </button>
          <a class="btn ghost" href="https://www.npmjs.com/package/pi-sentry-mcp"
            >View on npm</a
          >
        </div>
      </div>
    </section>
  </div>
</main>

<footer>
  <span>MIT</span>
  <a href="https://github.com/hempun10/pi-sentry-mcp">GitHub</a>
  <a href="https://www.npmjs.com/package/pi-sentry-mcp">npm</a>
  <a href="./privacy.html">Privacy</a>
  <a href="https://github.com/hempun10/pi-sentry-mcp/blob/main/LICENSE">License</a>
</footer>

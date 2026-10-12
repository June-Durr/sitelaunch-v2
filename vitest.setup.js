// Registers the DOM matchers (toBeInTheDocument and friends) for every test
// file, so each one does not have to import them itself.
import "@testing-library/jest-dom/vitest";

// jsdom has no layout engine, so two browser APIs this site uses are simply
// absent. Components call them on mount; without these they throw and the
// failure says nothing about the thing under test.
//
// Guarded on `window` existing at all, because this setup also runs for the
// prerender test, which is deliberately in a Node environment.
if (typeof window !== "undefined") {
  if (!window.matchMedia) {
    window.matchMedia = (query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    });
  }

  if (!window.IntersectionObserver) {
    class IntersectionObserverMock {
      observe() {}
      unobserve() {}
      disconnect() {}
      takeRecords() {
        return [];
      }
    }

    window.IntersectionObserver = IntersectionObserverMock;
    globalThis.IntersectionObserver = IntersectionObserverMock;
  }

  // jsdom defines scrollTo but makes it throw "not implemented".
  window.scrollTo = () => {};
}

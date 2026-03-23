# We Banned useEffect in Our React Codebase. Here's What We Use Instead.
## Target Keyword: react useeffect alternatives
## Secondary Keywords: useeffect antipatterns, react hooks best practices, tanstack query react
## Word Count Target: 1200
## Cover Image: PENDING — generate with /paper-hero after post is written

---

## Meta Description
Why one engineering team banned useEffect entirely, the 5 patterns they use instead, and why this matters even more now that AI agents are writing your code.

---

## Introduction

Alvin Sng posted "Why we banned React's useEffect" and it hit 2 million views. That's not a clickbait number for a tech blog post. That's the React community collectively exhaling and saying "finally, someone said it."

Here's the thing: nobody actually likes useEffect. Developers joke about it constantly. Guillermo Rauch (creator of Next.js) once tweeted "This year I'm going as a useEffect loop" for Halloween. Theo suggested renaming it to `DO_NOT_USE_EFFECT_OR_YOU_WILL_BE_FIRED`. The React core team published an entire guide called "You Might Not Need an Effect." The community knows this hook is a footgun.

So what do you use instead? Five patterns, and they're simpler than you think.

---

## Why useEffect Is Actually Broken (Most of the Time)

The honest answer is that useEffect isn't broken, it's overused. Developers reach for it as a default answer to "I need something to happen when X happens." But React already has better primitives for most of those situations.

The problems are real: infinite loops from cascading state updates, race conditions from unguarded fetch calls, timing bugs from the "set a flag, wait for effect, reset flag" dance. These bugs are subtle, hard to reproduce, and show up in production at the worst times.

And now with AI agents writing code, it gets worse. Agents love useEffect. It's flexible, it "works," and it's easy to add "just in case." Peter Steinberger tweeted that he refactored 141 useEffect calls after feeding one post to his agent. That's not an edge case. That's what a codebase looks like after a few months of AI-assisted development without guardrails.

---

## The 5 Patterns That Replace 95% of useEffect Usage

### 1. Derive State, Don't Sync It

This is the most common mistake. You have some state, and you write an effect to keep other state in sync with it.

```typescript
// Bad: two renders, potential for cascading effects
const [products, setProducts] = useState([]);
const [filteredProducts, setFilteredProducts] = useState([]);

useEffect(() => {
  setFilteredProducts(products.filter((p) => p.inStock));
}, [products]);
```

This runs twice every time `products` changes. First render shows stale filtered state. Second render shows the correct one. And if something else depends on `filteredProducts`, you've got a chain.

```typescript
// Good: compute it inline, one render pass
const [products, setProducts] = useState([]);
const filteredProducts = products.filter((p) => p.inStock);
```

That's it. No effect. No extra state. One render, correct data.

The smell test: if you're about to write `useEffect(() => setX(deriveFromY(y)), [y])`, stop. Compute it during render instead.

### 2. Use a Data-Fetching Library

Hand-rolling fetch in useEffect looks fine at first. Then you realize you haven't handled request cancellation. Or deduplication. Or caching. Or the race condition where a fast response from an old request overwrites a slow response from the current one.

```typescript
// Bad: no cancellation, no caching, race condition waiting to happen
function ProductPage({ productId }) {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetchProduct(productId).then(setProduct);
  }, [productId]);
}
```

If `productId` changes while the first request is in flight, both requests resolve and you might render stale data.

```typescript
// Good: TanStack Query handles all of this automatically
function ProductPage({ productId }) {
  const { data: product } = useQuery(['product', productId], () =>
    fetchProduct(productId)
  );
}
```

TanStack Query (React Query) gives you cancellation, deduplication, stale-while-revalidate, and automatic retries. For free. If you're writing fetch logic in useEffect, you're reinventing the wheel and doing it worse.

### 3. Event Handlers, Not Effects

This one trips people up. They want something to happen when a user clicks, so they set state in the handler and respond to it in an effect.

```typescript
// Bad: the "set flag, wait for effect, reset flag" pattern
function LikeButton() {
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (liked) {
      postLike();
      setLiked(false);
    }
  }, [liked]);

  return <button onClick={() => setLiked(true)}>Like</button>;
}
```

There's indirection here that creates real problems. What if the component unmounts between the click and when the effect runs? What if `liked` is already true for an unrelated reason?

```typescript
// Good: just put the logic in the handler
function LikeButton() {
  return <button onClick={() => postLike()}>Like</button>;
}
```

If an action is triggered by a user event, put it in the event handler. Direct, immediate, obvious.

### 4. useMountEffect for Actual External Sync

This is the only legitimate use for useEffect, and it works best wrapped in a tiny helper that makes the intent explicit.

```typescript
function useMountEffect(callback: () => void | (() => void)) {
  useEffect(callback, []);
}
```

Use this when you're genuinely syncing with something external: a video player, a map widget, a ResizeObserver. The key is the component should assume its preconditions are already met. Don't guard inside the effect.

```typescript
// Bad: effect guards against loading state
useEffect(() => {
  if (!isLoading) playVideo();
}, [isLoading]);

// Good: structure the tree so VideoPlayer only mounts when ready
function VideoPlayerWrapper({ isLoading }) {
  if (isLoading) return <LoadingScreen />;
  return <VideoPlayer />;
}

function VideoPlayer() {
  useMountEffect(() => playVideo());
}
```

The parent owns the preconditions. The child assumes they're met. This forces better component design.

### 5. Reset State with the Key Prop

If your effect exists only to "reset" a component when some ID changes, you're doing React's job manually.

```typescript
// Bad: useEffect watching videoId to reload
function VideoPlayer({ videoId }) {
  useEffect(() => {
    loadVideo(videoId);
  }, [videoId]);
}

// Good: use key to remount the component entirely
function VideoPlayer({ videoId }) {
  useMountEffect(() => {
    loadVideo(videoId);
  });
}

function VideoPlayerWrapper({ videoId }) {
  return <VideoPlayer key={videoId} videoId={videoId} />;
}
```

Changing the `key` prop tells React to destroy the old instance and create a fresh one. That's exactly what you want. The framework already does this correctly. Let it.

---

## The Case for Banning It Outright

You might be thinking "okay, I'll just use better judgment." And that's a reasonable position. But here's why a hard ban might actually be worth it.

When useEffect is allowed, there's always a debate: "should I use an effect here?" That debate wastes time and energy. A ban removes the question entirely. The answer is always no. You're forced into the cleaner pattern.

Factory (Alvin's team) saw concrete results after the ban: fewer infinite loops, fewer race-condition regressions, faster onboarding. Those aren't theoretical wins.

If you're not ready to go full ban, at least add an ESLint rule that flags direct useEffect usage and requires a comment justifying it. That alone catches most of the bad patterns.

And if you use AI agents to write code, this becomes critical. Put it in your `AGENTS.md` or whatever system prompt your agent reads. "No direct useEffect. Use useMountEffect for lifecycle, TanStack Query for fetching, event handlers for user actions." Without that guardrail, agents will add useEffect liberally, and you'll be doing what Peter Steinberger did: manually refactoring 141 instances.

---

## The Quick Reference

Run a search for `useEffect` in your codebase. For each one, ask:

- **Am I computing state from other state?** Compute inline during render.
- **Am I fetching data?** Use TanStack Query.
- **Am I responding to a user action?** Move it to the event handler.
- **Am I doing one-time external setup?** Use useMountEffect.
- **Am I resetting state when a prop changes?** Use the key prop.

If none of those fit, that's a sign you've found a genuinely complex case. `useMountEffect` is probably still the right tool, but at least you've ruled out the simpler options first.

---

## Conclusion

useEffect isn't evil. It's just overused. Most of the time, React already has the right tool for what you're trying to do. Effects should feel rare, not routine.

Audit your codebase. The patterns are all here. If you want to go further, add the ESLint rule, enforce useMountEffect in code review, and document it for your AI agents. You'll end up with code that's easier to read, easier to debug, and harder to break.

---

## Internal Links
- [Our guide to building with React](/blog/react-best-practices)
- [Why we use TanStack Query on every project](/blog/tanstack-query-guide)

## CTA
Building a React app and worried about code quality as the codebase grows? That's exactly the kind of thing we think about when we build for clients. [Talk to us](/contact) if you want a team that cares about this stuff.

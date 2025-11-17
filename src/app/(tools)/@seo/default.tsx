// This file tells Next.js to render *nothing* in the @seo slot 
// when it can't find a matching page.
export default function Default() {
  return (
    <div>
        <p>Hi inside default from seo.default.tsx</p>
    </div>
  );
}
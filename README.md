Books
=====

All the books I've read since 2011, at [books.mikemjharris.com](https://books.mikemjharris.com).

A static React site. The list lives in a Google Sheet published as CSV, which the page fetches in the
browser, so edits to the sheet show up without a deploy. It used to be an Express + GraphQL server that
fetched the same sheet; I wrote about that in two blog posts:
[the backend](https://blog.mikemjharris.com/posts/books-project-pt1) and
[the front end](https://blog.mikemjharris.com/posts/books-project-pt2).

```
npm install
npm run dev      # http://localhost:5173
npm run build    # static files in dist/
```

Pushing to `master` deploys to S3 + CloudFront with GitHub Actions
(infrastructure in [mikemjharris/infra](https://github.com/mikemjharris/infra)).

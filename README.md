# Todo App

A tiny browser todo list. No build step, no packages — open the page, add tasks, and they stay in local storage.

## Run it

From this folder:

```bash
python -m http.server 8000
```

Then open http://localhost:8000

You can also open `index.html` directly in a browser.

## Layout

| File | Role |
| --- | --- |
| `index.html` | Page structure: form, list, empty state |
| `styles.css` | Layout and look |
| `app.js` | Add / complete / delete, plus save/load |

## First change to try

Add a **filter** (All / Active / Done) in `app.js` and two extra buttons in `index.html`. That touches the form, the list render path, and the click handler without needing new libraries.

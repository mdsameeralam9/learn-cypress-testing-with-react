## ways to access element
Variant      |  No match            |  1 match           |  >1 match            |  Async?
-------------+----------------------+--------------------+----------------------+--------
getBy*       |  throw               |  return element    |  throw               |  No    
findBy*      |  throw (after wait)  |  Promise resolves  |  throw (after wait)  |  Yes   
queryBy*     |  null                |  return element    |  throw               |  No    
getAllBy*    |  throw               |  array             |  array               |  No    
findAllBy*   |  throw (after wait)  |  Promise<array>    |  Promise<array>      |  Yes   
queryAllBy*  |  []                  |  array             |  array               |  No    

## If you truly need to select by an identifier, use data-testid and the test-id queries:
 - getByTestId('some-id')
 - queryByTestId('some-id')
 - findByTestId('some-id')
 - getAllByTestId('some-id')
 - queryAllByTestId('some-id')
 - findAllByTestId('some-id')

#### Examples:
<input data-testid="user-row" />
<button data-testid="save-btn">Save</button>
const el = screen.getByTestId('user-row')
expect(screen.queryByTestId('spinner')).not.toBeInTheDocument()
const items = await screen.findAllByTestId('todo-item')



## Element: Text input
 - screen.getByRole('textbox', { name: /first name/i })
 - screen.getByLabelText(/email/i); 
 - screen.getByPlaceholderText(/email/i); 
 - screen.getByDisplayValue('value')
#### Notes: "textbox" covers input[type=text] and textarea; use findByRole for async
### What “name” matches in getByRoleles
- Label text: <label htmlFor="todo">Todo</label><input id="todo" type="text" /> → name is “Todo”.
- aria-label: <input type="text" aria-label="Todo" /> → name is “Todo”.
- aria-labelledby: <span id="t">Todo</span><input type="text" aria-labelledby="t" /> → name is “Todo”.

## Element: Password input
 - screen.getByLabelText(/password/i)
 - screen.getByRole('textbox', { name: /password/i }); 
 - screen.getByPlaceholderText(/password/i)
#### Notes: Some setups expose password as "textbox"; label is reliable

## Element: Checkbox
 - screen.getByRole('checkbox', { name: /accept/i })
 - screen.getByLabelText(/terms/i)
#### Notes: Prefer role + name; use findByRole for async

## Element: Radio
 - screen.getByRole('radio', { name: /male/i })
 - screen.getByLabelText(/option a/i)
#### Notes: Use getAllByRole('radio') for groups

Element: Combobox (select/autocomplete)
Primary query: screen.getByRole('combobox', { name: /country/i })
Example: const sel = screen.getByRole('combobox', { name: /state/i })
Alternatives: screen.getByLabelText(/country/i)
Notes: Role depends on semantics; select typically "combobox"

Element: Button
Primary query: screen.getByRole('button', { name: /submit/i })
Example: const btn = screen.getByRole('button', { name: /save/i })
Alternatives: screen.getByText(/save/i)
Notes: Prefer native button; ARIA role needs keyboard handlers

Element: Link
Primary query: screen.getByRole('link', { name: /home/i })
Example: const a = screen.getByRole('link', { name: /docs/i })
Alternatives: screen.getByText(/docs/i)
Notes: Accessible name is link text or aria-label

Element: Heading
Primary query: screen.getByRole('heading', { name: /profile/i, level: 2 })
Example: const h2 = screen.getByRole('heading', { name: /settings/i, level: 2 })
Alternatives: screen.getByText(/settings/i)
Notes: Level filters h1–h6

Element: Alert
Primary query: screen.getByRole('alert')
Example: const alert = screen.getByRole('alert')
Alternatives: screen.getByText(/error/i)
Notes: For status/error regions

Element: List
Primary query: screen.getByRole('list')
Example: const list = screen.getByRole('list')
Alternatives: screen.getByRole('listbox') (selectable)
Notes: ul/ol expose "list"

Element: List item (li)
Primary query: screen.getAllByRole('listitem')
Example: const items = screen.getAllByRole('listitem')
Alternatives: queryAllByRole('listitem')
Notes: Prefer native ul/ol > li over ARIA list/listitem

Element: Image
Primary query: screen.getByRole('img', { name: /logo/i })
Example: const img = screen.getByRole('img', { name: /avatar/i })
Alternatives: screen.getByAltText(/avatar/i)
Notes: Name comes from alt text

Element: Form
Primary query: screen.getByRole('form', { name: /checkout/i })
Example: const form = screen.getByRole('form')
Alternatives: —
Notes: Use accessible name if present

Element: Dialog
Primary query: screen.getByRole('dialog', { name: /confirm/i })
Example: const dlg = screen.getByRole('dialog', { name: /edit/i })
Alternatives: —
Notes: Includes modal dialogs

Element: Progressbar
Primary query: screen.getByRole('progressbar')
Example: const p = screen.getByRole('progressbar')
Alternatives: —
Notes: For loading indicators

Element: Status
Primary query: screen.getByRole('status')
Example: const s = screen.getByRole('status')
Alternatives: —
Notes: Non-interruptive updates

Element: ByLabelText
Primary query: screen.getByLabelText(/email/i)
Example: const el = screen.getByLabelText(/search/i)
Alternatives: —
Notes: Great for controls tied to labels

Element: ByPlaceholderText
Primary query: screen.getByPlaceholderText(/search/i)
Example: const el = screen.getByPlaceholderText(/type here/i)
Alternatives: —
Notes: Useful but less robust than labels

Element: ByText
Primary query: screen.getByText(/welcome/i)
Example: const node = screen.getByText('Submit')
Alternatives: —
Notes: Prefer role+name for interactive elements

Element: ByDisplayValue
Primary query: screen.getByDisplayValue('John Doe')
Example: const el = screen.getByDisplayValue('42')
Alternatives: —
Notes: For current input value

Element: ByAltText
Primary query: screen.getByAltText(/product photo/i)
Example: const img = screen.getByAltText('Logo')
Alternatives: —
Notes: For images’ alt text

Element: ByTitle
Primary query: screen.getByTitle(/tooltip/i)
Example: const t = screen.getByTitle('Close')
Alternatives: —
Notes: Title attribute; lower priority

Element: Test ID
Primary query: screen.getByTestId('submit-button')
Example: const n = screen.getByTestId('user-row')
Alternatives: —
Notes: Last resort per guidelines

Want this as a downloadable .txt or .md file content block next?

[1](https://www.markdownguide.org/extended-syntax/)
[2](https://ardalis.com/how-to-easily-format-tables-in-markdown/)
[3](https://google.github.io/styleguide/docguide/style.html)
[4](https://www.codecademy.com/resources/docs/markdown/tables)
[5](https://tiiny.host/blog/how-to-make-a-table-in-markdown/)
[6](https://learn.microsoft.com/en-us/powershell/scripting/community/contributing/general-markdown?view=powershell-7.5)
[7](https://blog.markdowntools.com/posts/markdown-tables-advanced-features-and-styling-guide)
[8](https://meta.stackoverflow.com/questions/418550/when-to-use-code-formatted-tables-or-markdown-formatted-tables)
[9](https://www.markdownguide.org/basic-syntax/)
[10](https://docs.github.com/en/get-started/writing-on-github/working-with-advanced-formatting/organizing-information-with-tables)
import {
  includes,
  append,
  clone,
  complement,
  is,
  splitWhen,
  isNil,
} from "ramda"

export const _parser = query => {
  const [path, opt] = splitWhen(complement(is)(String), query)
  if (isNil(path) || path.length === 0) return null
  if (!is(Object, opt)) return null
  let q = { path }
  let _filter = { "==": [] }
  let _keys = {}
  let _ranges = {}
  let _range_field = null
  let _sort = null
  let _startAt = null
  let _startAfter = null
  let _endAt = null
  let _endBefore = null
  let _startAtCursor = null
  let _startAfterCursor = null
  let _endAtCursor = null
  let _endBeforeCursor = null
  let _array_contains = null
  let _array_contains_any = null
  for (const v of clone(opt)) {
    if (is(Number)(v)) {
      if (isNil(q.limit)) {
        if (v > 1000) return null
        if (v !== Math.round(Math.abs(v)) || v < 1) {
          return null
        }
        q.limit = v
      } else {
        return null
      }
    } else if (!is(Array)(v)) {
      return null
    } else {
      if (v.length === 0) {
        return null
      } else if (v[0] === "startAt") {
        if (
          !isNil(_startAt) ||
          !isNil(_startAfter) ||
          !isNil(_startAtCursor) ||
          !isNil(_startAfterCursor)
        ) {
          return null
        } else if (v.length <= 1) {
          return null
        } else {
          if (v[1].__cursor__) {
            _startAtCursor = v
            _startAtCursor[1].data.__id__ = _startAtCursor[1].id
          } else {
            _startAt = v
          }
        }
      } else if (v[0] === "startAfter") {
        if (
          !isNil(_startAt) ||
          !isNil(_startAfter) ||
          !isNil(_startAtCursor) ||
          !isNil(_startAfterCursor)
        ) {
          return null
        } else if (v.length <= 1) {
          return null
        } else {
          if (v[1].__cursor__) {
            _startAfterCursor = v
            _startAfterCursor[1].data.__id__ = _startAfterCursor[1].id
          } else {
            _startAfter = v
          }
        }
      } else if (v[0] === "endAt") {
        if (
          !isNil(_endAt) ||
          !isNil(_endBefore) ||
          !isNil(_endAtCursor) ||
          !isNil(_endBeforeCursor)
        ) {
          return null
        } else if (v.length <= 1) {
          return null
        } else {
          if (v[1].__cursor__) {
            _endAtCursor = v
            _endAtCursor[1].data.__id__ = _endAtCursor[1].id
          } else {
            _endAt = v
          }
        }
      } else if (v[0] === "endBefore") {
        if (
          !isNil(_endAt) ||
          !isNil(_endBefore) ||
          !isNil(_endAtCursor) ||
          !isNil(_endBeforeCursor)
        ) {
          return null
        } else if (v.length <= 1) {
          return null
        } else {
          if (v[1].__cursor__) {
            _endBeforeCursor = v
            _endBeforeCursor[1].data.__id__ = _endBeforeCursor[1].id
          } else {
            _endBefore = v
          }
        }
      } else if (v.length === 3) {
        if (
          includes(v[1])([
            "==",
            "!=",
            ">",
            "<",
            ">=",
            "<=",
            "in",
            "not-in",
            "array-contains",
            "array-contains-any",
          ])
        ) {
          if (includes(v[1], ["array-contains", "array-contains-any"])) {
            if (
              !isNil(_filter["array-contains"]) ||
              !isNil(_filter["array-contains-any"])
            ) {
              return null
            }
            if (v[1] === "array-contains-any" && !is(Array, v[2])) {
              return null
            }
            _filter[v[1]] = v
          } else if (
            includes(v[1], ["!=", "in", "not-in", ">", ">=", "<", "<="])
          ) {
            if (includes(v[1], ["in", "not-in"]) && !is(Array, v[2])) {
              return null
            }
            if (includes(v[1], [">", ">=", "<", "<="])) {
              if (
                !isNil(_filter["!="]) ||
                !isNil(_filter["in"]) ||
                !isNil(_filter["not-in"])
              ) {
                return null
              }
              if (!isNil(_range_field) && _range_field !== v[0]) {
                return null
              } else if (
                _ranges[v[1]] ||
                (v[1] === ">" && _ranges[">="]) ||
                (v[1] === ">=" && _ranges[">"]) ||
                (v[1] === "<" && _ranges["<="]) ||
                (v[1] === "<=" && _ranges["<"])
              ) {
                return null
              } else {
                _filter.range ??= []
                _filter.range.push(v)
                _range_field = v[0]
                _ranges[v[1]] = true
              }
            } else {
              if (
                !isNil(_filter.range) ||
                !isNil(_filter["!="]) ||
                !isNil(_filter["in"]) ||
                !isNil(_filter["not-in"])
              ) {
                return null
              }
              _filter[v[1]] = v
            }
          } else if (v[1] === "==") {
            if (
              !isNil(_filter.range) ||
              !isNil(_filter["!="]) ||
              !isNil(_filter["in"]) ||
              !isNil(_filter["not-in"])
            ) {
              return null
            } else if (_keys[v[0]]) return null
            _filter["=="].push(v)
            _keys[v[0]] = true
          } else {
            if (!isNil(_filter[v[1]])) return null
            _filter[v[1]] = v
          }
        } else {
          return null
        }
      } else if (v.length === 2) {
        if (includes(v[1])(["asc", "desc"])) {
          if (isNil(_sort)) {
            _sort = [v]
          } else {
            _sort.push(v)
          }
        } else {
          return null
        }
      } else if (v.length === 1) {
        if (isNil(_sort)) {
          _sort = [append("asc", v)]
        } else {
          _sort.push(append("asc", v))
        }
      } else {
        return null
      }
    }
  }
  q.limit ??= 1000
  q.start = _startAt ?? _startAfter ?? null
  q.end_ = _endAt ?? _endBefore ?? null
  q.startCursor = _startAtCursor ?? _startAfterCursor ?? null
  q.endCursor = _endAtCursor ?? _endBeforeCursor ?? null
  q.sort = _sort ?? []
  q.reverse = { start: false, end_: false }
  q.array = _filter["array-contains"] ?? _filter["array-contains-any"] ?? null
  q.equals = _filter["=="]
  q.range =
    _filter.range ??
    (!isNil(_filter.in)
      ? [_filter.in]
      : !isNil(_filter["not-in"])
        ? [_filter["not-in"]]
        : !isNil(_filter["!="])
          ? [_filter["!="]]
          : null)
  q.sortByTail = false
  return q
}

export const qs1 = [
  // Basic path queries
  ["users"],
  ["organizations", "departments"],
  ["users", "documents", "versions"],
  ["teams", "members", "roles"],
  ["companies", "employees", "tasks"],

  // Basic limit queries
  ["users", 10],
  ["posts", 1],
  ["tasks", 1000],
  ["items", 999],
  ["docs", 500],

  // Basic equality filters
  ["users", ["name", "==", "John"]],
  ["posts", ["status", "==", "active"]],
  ["users", ["age", "==", 25]],
  ["orders", ["isComplete", "==", true]],
  ["products", ["price", "==", 99.99]],

  // Multiple equality filters
  ["users", ["name", "==", "John"], ["age", "==", 25]],
  ["posts", ["status", "==", "active"], ["type", "==", "blog"]],
  ["orders", ["status", "==", "pending"], ["total", "==", 100]],
  ["products", ["category", "==", "electronics"], ["brand", "==", "Apple"]],
  ["employees", ["department", "==", "IT"], ["level", "==", "senior"]],

  // Range filters
  ["users", ["age", ">", 18]],
  ["users", ["age", ">=", 21]],
  ["users", ["age", "<", 65]],
  ["users", ["age", "<=", 60]],
  ["products", ["price", ">=", 100]],

  // Combined range filters on same field (valid combinations)
  ["users", ["age", ">=", 18], ["age", "<", 65]],
  ["products", ["price", ">", 10], ["price", "<=", 100]],
  ["items", ["quantity", ">", 0], ["quantity", "<=", 50]],
  ["temperatures", ["value", ">=", 0], ["value", "<=", 100]],
  ["scores", ["points", ">", 50], ["points", "<", 100]],

  // Array contains queries
  ["users", ["roles", "array-contains", "admin"]],
  ["posts", ["tags", "array-contains", "featured"]],
  ["products", ["categories", "array-contains", "electronics"]],
  ["movies", ["genres", "array-contains", "action"]],
  ["books", ["authors", "array-contains", "John Doe"]],

  // Array contains any queries
  ["users", ["roles", "array-contains-any", ["admin", "moderator"]]],
  ["posts", ["tags", "array-contains-any", ["featured", "trending"]]],
  [
    "products",
    ["categories", "array-contains-any", ["electronics", "accessories"]],
  ],
  ["movies", ["genres", "array-contains-any", ["action", "adventure"]]],
  ["docs", ["status", "array-contains-any", ["draft", "review"]]],

  // IN queries
  ["users", ["status", "in", ["active", "pending"]]],
  ["posts", ["type", "in", ["blog", "news", "article"]]],
  ["products", ["category", "in", ["electronics", "accessories"]]],
  ["orders", ["status", "in", ["processing", "shipped"]]],
  ["tasks", ["priority", "in", ["high", "medium", "low"]]],

  // NOT IN queries
  ["users", ["status", "not-in", ["banned", "deleted"]]],
  ["posts", ["type", "not-in", ["draft", "archived"]]],
  ["products", ["category", "not-in", ["discontinued"]]],
  ["orders", ["status", "not-in", ["cancelled", "refunded"]]],
  ["employees", ["status", "not-in", ["terminated", "suspended"]]],

  // Not equals queries
  ["users", ["status", "!=", "banned"]],
  ["posts", ["type", "!=", "draft"]],
  ["products", ["price", "!=", 0]],
  ["orders", ["status", "!=", "cancelled"]],
  ["tasks", ["priority", "!=", "low"]],

  // Basic sorting
  ["users", ["name", "asc"]],
  ["users", ["age", "desc"]],
  ["products", ["price", "desc"]],
  ["posts", ["date", "desc"]],
  ["orders", ["total", "asc"]],

  // Multiple field sorting
  ["users", ["name", "asc"], ["age", "desc"]],
  ["products", ["category", "asc"], ["price", "desc"]],
  ["posts", ["date", "desc"], ["title", "asc"]],
  ["orders", ["status", "asc"], ["date", "desc"]],
  ["tasks", ["priority", "desc"], ["dueDate", "asc"]],

  // Implicit ascending sort
  ["users", ["name"]],
  ["products", ["price"]],
  ["posts", ["date"]],
  ["orders", ["total"]],
  ["tasks", ["dueDate"]],

  // Cursor queries
  ["users", ["startAt", "John"]],
  ["users", ["startAfter", "John"]],
  ["users", ["endAt", "Zeus"]],
  ["users", ["endBefore", "Zeus"]],
  ["products", ["startAt", 100]],

  // Cursor with document snapshots
  [
    "users",
    ["startAt", { __cursor__: true, id: "123", data: { name: "John" } }],
  ],
  [
    "users",
    ["startAfter", { __cursor__: true, id: "456", data: { name: "Jane" } }],
  ],
  ["users", ["endAt", { __cursor__: true, id: "789", data: { name: "Zeus" } }]],
  [
    "users",
    ["endBefore", { __cursor__: true, id: "012", data: { name: "Zack" } }],
  ],
  [
    "products",
    ["startAt", { __cursor__: true, id: "999", data: { price: 100 } }],
  ],

  // Complex combinations
  [
    "users",
    ["name", "==", "John"],
    ["age", ">=", 21],
    ["status", "in", ["active", "pending"]],
    ["name", "asc"],
    10,
  ],
  [
    "products",
    ["category", "==", "electronics"],
    ["price", ">=", 100],
    ["price", "<=", 1000],
    ["brand", "in", ["Apple", "Samsung"]],
    ["rating", "desc"],
    20,
  ],
  [
    "posts",
    ["status", "==", "published"],
    ["type", "in", ["blog", "article"]],
    ["tags", "array-contains", "featured"],
    ["date", "desc"],
    ["title", "asc"],
    50,
  ],

  // Deep paths with all operations
  [
    "organizations",
    "departments",
    "teams",
    ["name", "==", "Engineering"],
    ["size", ">", 10],
    ["tags", "array-contains", "technical"],
    ["status", "in", ["active", "hiring"]],
    ["createdAt", "desc"],
    25,
  ],

  // Complex queries with multiple features
  [
    "users",
    ["name", "==", "John"],
    ["age", ">=", 21],
    ["roles", "array-contains", "admin"],
    ["status", "in", ["active", "vacation"]],
    ["department", "!=", "archived"],
    ["name", "asc"],
    ["joinDate", "desc"],
    ["startAt", { __cursor__: true, id: "123", data: { name: "John" } }],
    50,
  ],
]

export const qs2 = [
  // Basic path queries
  (["users"],
  ["organizations"],
  ["products"],
  ["teams"],
  ["documents"],
  // Multiple segment paths
  ["users", "profiles"],
  ["organizations", "members"],
  ["teams", "projects"],
  ["users", "settings"],
  ["products", "reviews"],
  // Simple numeric limits
  ["users", 10],
  ["teams", 50],
  ["products", 100],
  ["documents", 500],
  ["organizations", 999],
  // Single equality filters
  ["users", ["name", "==", "John"]],
  ["products", ["status", "==", "active"]],
  ["teams", ["size", "==", 5]],
  ["orders", ["isComplete", "==", true]],
  ["tasks", ["priority", "==", 1]],
  // Single range filters
  ["users", ["age", ">", 18]],
  ["products", ["price", ">=", 100]],
  ["tasks", ["dueDate", "<", "2024-12-31"]],
  ["orders", ["total", "<=", 1000]],
  ["teams", ["members", ">", 5]],
  // Single array-contains
  ["users", ["roles", "array-contains", "admin"]],
  ["products", ["categories", "array-contains", "electronics"]],
  ["documents", ["tags", "array-contains", "important"]],
  ["teams", ["technologies", "array-contains", "javascript"]],
  ["tasks", ["assignees", "array-contains", "user1"]],
  // Single array-contains-any
  ["users", ["roles", "array-contains-any", ["admin", "moderator"]]],
  [
    "products",
    ["categories", "array-contains-any", ["electronics", "accessories"]],
  ],
  ["documents", ["tags", "array-contains-any", ["urgent", "important"]]],
  ["teams", ["technologies", "array-contains-any", ["javascript", "python"]]],
  ["tasks", ["labels", "array-contains-any", ["bug", "feature"]]],
  // Single in filters
  ["users", ["status", "in", ["active", "pending"]]],
  ["products", ["category", "in", ["electronics", "books"]]],
  ["orders", ["status", "in", ["pending", "processing"]]],
  ["tasks", ["priority", "in", ["high", "medium", "low"]]],
  ["teams", ["type", "in", ["development", "design"]]],
  // Single not-in filters
  ["users", ["status", "not-in", ["banned", "deleted"]]],
  ["products", ["category", "not-in", ["discontinued"]]],
  ["orders", ["status", "not-in", ["cancelled", "refunded"]]],
  ["documents", ["type", "not-in", ["archived", "draft"]]],
  ["tasks", ["priority", "not-in", ["none"]]],
  // Single inequality filters
  ["users", ["status", "!=", "banned"]],
  ["products", ["price", "!=", 0]],
  ["orders", ["total", "!=", 0]],
  ["tasks", ["assignee", "!=", null]],
  ["teams", ["size", "!=", 0]],
  // Single sort orders (ascending)
  ["users", ["name", "asc"]],
  ["products", ["price", "asc"]],
  ["orders", ["date", "asc"]],
  ["tasks", ["priority", "asc"]],
  ["teams", ["size", "asc"]],
  // Single sort orders (descending)
  ["users", ["createdAt", "desc"]],
  ["products", ["rating", "desc"]],
  ["orders", ["total", "desc"]],
  ["tasks", ["dueDate", "desc"]],
  ["teams", ["updatedAt", "desc"]],
  // Simple cursor queries
  ["users", ["startAt", "A"]],
  ["users", ["startAfter", "B"]],
  ["users", ["endAt", "Y"]],
  ["users", ["endBefore", "Z"]],
  ["products", ["startAt", 0]],
  // Equality filter with limit
  ["users", ["role", "==", "admin"], 10],
  ["products", ["category", "==", "electronics"], 20],
  ["orders", ["status", "==", "pending"], 30],
  ["tasks", ["isComplete", "==", false], 40],
  ["teams", ["isActive", "==", true], 50],
  // Range filter with limit
  ["products", ["price", ">", 100], 10],
  ["users", ["age", ">=", 21], 20],
  ["orders", ["total", "<", 1000], 30],
  ["tasks", ["progress", "<=", 90], 40],
  ["teams", ["size", ">", 5], 50],
  // Array filter with limit
  ["users", ["roles", "array-contains", "admin"], 10],
  ["products", ["tags", "array-contains", "sale"], 20],
  ["documents", ["categories", "array-contains", "public"], 30],
  ["teams", ["members", "array-contains", "john"], 40],
  ["tasks", ["watchers", "array-contains", "jane"], 50],
  // In filter with limit
  ["users", ["status", "in", ["active", "pending"]], 10],
  ["products", ["category", "in", ["electronics", "books"]], 20],
  ["orders", ["status", "in", ["new", "processing"]], 30],
  ["tasks", ["priority", "in", ["high", "medium"]], 40],
  ["teams", ["type", "in", ["dev", "design"]], 50],
  // Simple numeric cursor queries
  ["products", ["startAt", 100]],
  ["products", ["startAfter", 200]],
  ["products", ["endAt", 900]],
  ["products", ["endBefore", 1000]],
  ["users", ["startAt", 1]],
  // Single equality with ascending sort
  ["users", ["role", "==", "user"], ["name", "asc"]],
  ["products", ["category", "==", "books"], ["price", "asc"]],
  ["orders", ["status", "==", "active"], ["date", "asc"]],
  ["tasks", ["type", "==", "bug"], ["priority", "asc"]],
  ["teams", ["department", "==", "engineering"], ["size", "asc"]],
  // Single equality with descending sort
  ["users", ["status", "==", "active"], ["createdAt", "desc"]],
  ["products", ["isAvailable", "==", true], ["rating", "desc"]],
  ["orders", ["isPaid", "==", true], ["amount", "desc"]],
  ["tasks", ["isComplete", "==", false], ["dueDate", "desc"]],
  ["teams", ["isArchived", "==", false], ["updatedAt", "desc"]],
  // Single array-contains with sort
  ["users", ["roles", "array-contains", "user"], ["name", "asc"]],
  ["products", ["categories", "array-contains", "new"], ["date", "desc"]],
  ["documents", ["tags", "array-contains", "shared"], ["title", "asc"]],
  ["teams", ["skills", "array-contains", "react"], ["name", "asc"]],
  ["tasks", ["labels", "array-contains", "urgent"], ["priority", "desc"]],
  // Simple cursor with sort
  ["users", ["name", "asc"], ["startAt", "A"]],
  ["users", ["name", "desc"], ["startAfter", "B"]],
  ["users", ["age", "asc"], ["endAt", 50]],
  ["users", ["score", "desc"], ["endBefore", 100]],
  ["products", ["price", "asc"], ["startAt", 0]]),
]

export const qs3 = [
  // Cursors with equality and sort
  [
    "users",
    ["role", "==", "admin"],
    ["name", "asc"],
    [
      "startAt",
      { __cursor__: true, id: "1", data: { name: "A", role: "admin" } },
    ],
  ],
  [
    "products",
    ["category", "==", "electronics"],
    ["price", "desc"],
    [
      "startAt",
      {
        __cursor__: true,
        id: "2",
        data: { price: 1000, category: "electronics" },
      },
    ],
  ],
  [
    "orders",
    ["status", "==", "pending"],
    ["date", "desc"],
    [
      "startAt",
      {
        __cursor__: true,
        id: "3",
        data: { date: "2024-01-01", status: "pending" },
      },
    ],
  ],
  [
    "users",
    ["isActive", "==", true],
    ["joinDate", "asc"],
    [
      "startAt",
      {
        __cursor__: true,
        id: "4",
        data: { joinDate: "2023-01-01", isActive: true },
      },
    ],
  ],
  [
    "products",
    ["isAvailable", "==", true],
    ["rating", "desc"],
    [
      "startAt",
      { __cursor__: true, id: "5", data: { rating: 5, isAvailable: true } },
    ],
  ],

  // Cursors with array-contains and sort
  [
    "users",
    ["roles", "array-contains", "admin"],
    ["name", "asc"],
    [
      "startAt",
      { __cursor__: true, id: "6", data: { name: "A", roles: ["admin"] } },
    ],
  ],
  [
    "products",
    ["tags", "array-contains", "featured"],
    ["price", "desc"],
    [
      "startAt",
      { __cursor__: true, id: "7", data: { price: 1000, tags: ["featured"] } },
    ],
  ],
  [
    "documents",
    ["categories", "array-contains", "public"],
    ["title", "asc"],
    [
      "startAt",
      {
        __cursor__: true,
        id: "8",
        data: { title: "A", categories: ["public"] },
      },
    ],
  ],
  [
    "teams",
    ["technologies", "array-contains", "react"],
    ["name", "asc"],
    [
      "startAt",
      {
        __cursor__: true,
        id: "9",
        data: { name: "A", technologies: ["react"] },
      },
    ],
  ],
  [
    "projects",
    ["members", "array-contains", "john"],
    ["updatedAt", "desc"],
    [
      "startAt",
      {
        __cursor__: true,
        id: "10",
        data: { updatedAt: "2024-01-01", members: ["john"] },
      },
    ],
  ],

  // Cursors with equality, sort, and limit
  [
    "users",
    ["status", "==", "active"],
    ["name", "asc"],
    [
      "startAt",
      { __cursor__: true, id: "11", data: { name: "A", status: "active" } },
    ],
    10,
  ],
  [
    "products",
    ["brand", "==", "Apple"],
    ["price", "desc"],
    [
      "startAt",
      { __cursor__: true, id: "12", data: { price: 2000, brand: "Apple" } },
    ],
    20,
  ],
  [
    "orders",
    ["type", "==", "subscription"],
    ["amount", "desc"],
    [
      "startAt",
      {
        __cursor__: true,
        id: "13",
        data: { amount: 1000, type: "subscription" },
      },
    ],
    50,
  ],
  [
    "teams",
    ["department", "==", "engineering"],
    ["size", "desc"],
    [
      "startAt",
      {
        __cursor__: true,
        id: "14",
        data: { size: 100, department: "engineering" },
      },
    ],
    25,
  ],
  [
    "documents",
    ["visibility", "==", "public"],
    ["createdAt", "desc"],
    [
      "startAt",
      {
        __cursor__: true,
        id: "15",
        data: { createdAt: "2024-01-01", visibility: "public" },
      },
    ],
    30,
  ],

  // Cursors with array-contains, sort, and limit
  [
    "users",
    ["permissions", "array-contains", "write"],
    ["level", "desc"],
    [
      "startAt",
      {
        __cursor__: true,
        id: "16",
        data: { level: 10, permissions: ["write"] },
      },
    ],
    15,
  ],
  [
    "products",
    ["categories", "array-contains", "premium"],
    ["rating", "desc"],
    [
      "startAt",
      {
        __cursor__: true,
        id: "17",
        data: { rating: 5, categories: ["premium"] },
      },
    ],
    40,
  ],
  [
    "teams",
    ["skills", "array-contains", "typescript"],
    ["experience", "desc"],
    [
      "startAt",
      {
        __cursor__: true,
        id: "18",
        data: { experience: 5, skills: ["typescript"] },
      },
    ],
    35,
  ],
  [
    "projects",
    ["tags", "array-contains", "featured"],
    ["priority", "desc"],
    [
      "startAt",
      { __cursor__: true, id: "19", data: { priority: 1, tags: ["featured"] } },
    ],
    45,
  ],
  [
    "documents",
    ["viewers", "array-contains", "team1"],
    ["size", "desc"],
    [
      "startAt",
      { __cursor__: true, id: "20", data: { size: 1000, viewers: ["team1"] } },
    ],
    60,
  ],
]

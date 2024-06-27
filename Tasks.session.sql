CREATE TABLE Todos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    task TEXT NOT NULL,
    description TEXT,
    due_date DATE NOT NULL,
    completed BOOLEAN DEFAULT FALSE,
    is_editing BOOLEAN DEFAULT FALSE,
    is_expanded BOOLEAN DEFAULT FALSE,
    priority BOOLEAN DEFAULT FALSE,
    overdue BOOLEAN DEFAULT FALSE
);

CREATE TABLE Categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    color VARCHAR(255) NOT NULL
);

CREATE TABLE TodoCategories (
    todo_id UUID,
    category_id UUID,
    PRIMARY KEY (todo_id, category_id),
    FOREIGN KEY (todo_id) REFERENCES Todos(id) ON DELETE CASCADE,
    FOREIGN KEY (category_id) REFERENCES Categories(id) ON DELETE CASCADE
);

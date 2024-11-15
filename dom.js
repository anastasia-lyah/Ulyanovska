document.addEventListener('DOMContentLoaded', () => {
    let currentNode = document.body; 
    let previousNodes = [];

    const navigateDOM = (node) => {
        if (!node) {
            alert("Додаткових вузлів немає!");
            return;
        }

        while (
            node && 
            (node.nodeType === Node.TEXT_NODE && !node.textContent.trim() || node.nodeType === Node.COMMENT_NODE)
        ) {
            node = node.nextSibling || getNextParentSibling(node);
        }

        if (!node) {
            alert("Додаткових вузлів немає!");
            return;
        }

        const content = node.nodeType === Node.TEXT_NODE ? node.textContent.trim() : node.tagName;
        const message = `Вміст вузла: "${content}". Що бажаєте зробити?`;

        const action = prompt(`${message}\n1: Перейти далі\n2: Повернутися назад\n3: Завершити`, "1");

        switch (action) {
            case "1": 
                previousNodes.push(node);
                navigateDOM(node.firstChild || node.nextSibling || getNextParentSibling(node));
                break;

            case "2": 
                const previousNode = previousNodes.pop();
                if (previousNode) {
                    navigateDOM(previousNode);
                } else {
                    alert("Немає вузлів для повернення.");
                }
                break;

            case "3": 
                alert("Роботу завершено.");
                return;

            default:
                alert("Невірний вибір. Спробуйте ще раз.");
                navigateDOM(node); 
        }
    };

    const getNextParentSibling = (node) => {
        while (node && !node.nextSibling) {
            node = node.parentNode;
        }
        return node ? node.nextSibling : null;
    };

    navigateDOM(currentNode);
});

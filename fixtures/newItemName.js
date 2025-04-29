const itemName = () => `Item_${Date.now()}`;

function cyrillicName() {
    const cyrillicItemName = ['Элемент', 'Программа', 'Проект', 'Продукт', 'Услуга', 'Инкремент продукта', 'Программное обеспечение', 'Обеспечение качества'];
    const randomIndex = Math.floor(Math.random() * cyrillicItemName.length);
    return cyrillicItemName[randomIndex];
};

export { itemName, cyrillicName };
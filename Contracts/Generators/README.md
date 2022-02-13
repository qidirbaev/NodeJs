# Generatorlarni qachon foydalanaman:
    1. Dinamik datalarni processing qilish paytida (200-300 change per second on register)
    2. Xotirani to'g'ri taqsimlash uchun
    3. Funksional tranzaksiyalarni qurish payitoda:
        3.1 Funksiyaga bir nechta marta `call` bo'lganda 1- va 2- `call`arni bog'lash maqsadida
        3.2 Funksiyalarga `conditional resume` qo'shish maqsadida
    4. Dinamik iteratsiyalarni yaratish uchun
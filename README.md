# Dziennik Nastrojów

> Prosta aplikacja mobilna do monitorowania codziennych nastrojów i planowania działań.

## Opis projektu

"Dziennik Nastrojów" to aplikacja mobilna stworzona w React Native z wykorzystaniem Expo Router, umożliwiająca:

- codzienne dodawanie wpisów z oceną nastroju,
- dołączanie notatek, planów oraz zdjęcia,
- przeglądanie historii wpisów,
- analizę nastroju w czasie,
- sugestie na podstawie dominującego nastroju,
- zabezpieczenie dostępu przez ekran logowania.

## Funkcjonalności

- [x] Logowanie (z wykorzystaniem `AsyncStorage`)
- [x] Dodawanie wpisów z nastrojem, planem i notatką
- [x] Dodawanie zdjęcia z galerii lub aparatu
- [x] Historia wpisów i widok szczegółów
- [x] Statystyki: dominanta nastroju i sugestia
- [x] Komponent powiadomień modalnych
- [x] Responsywny interfejs

## Stack technologiczny

- React Native
- Expo + Expo Router
- JavaScript (ES6+)
- AsyncStorage
- Expo ImagePicker

## Struktura folderów

```
app/
├── (tabs)/              # Nawigacja tabowa
│   ├── strona-glowna.js
│   ├── dodaj-wpis.js
│   ├── statystyki.js
│   └── wpis/[id].js     # Szczegóły wpisu
├── logowanie.js           # Logowanie
└── _layout.js             # Layout aplikacji

components/
├── powiadomienie.js        # Komponent modalny

konteksty/
└── WpisyContext.js         # Zarządzanie stanem wpisów
```

## Jak uruchomić projekt

1. Zainstaluj zależności:

```bash
npm install
```

2. Uruchom aplikację:

```bash
npx expo start
```

## Autor

Klaudia Pruczkowska
Projekt na zaliczenie przedmiotu z programowania aplikacji mobilnych.

## Status projektu

Projekt w trakcie realizacji. Ostatnia aktualizacja: **czerwiec 2025**.

## Plany rozwoju

- [ ] Przechowywanie danych w chmurze (np. Firebase)
- [ ] Ustawienia konta i edycja profilu
- [ ] Przypomnienia o dodaniu wpisu

## Kontakt

Masz pytania lub sugestie? Napisz na: **[klaudia.pruczkowska@wp.pl](mailto:klaudia.pruczkowska@wp.pl)**

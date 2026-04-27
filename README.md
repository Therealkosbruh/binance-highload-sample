# FLUX - Real-time Trading Dashboard

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19-61dafb?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?style=flat-square&logo=typescript)
![Zustand](https://img.shields.io/badge/Zustand-5-orange?style=flat-square)

---



Реализация торгового дашборда в реальном времени, который стримит живые данные с публичных WebSocket стримов Binance. Можно следить сразу за несколькими торговыми парами.

Взаимодействие с back частью происходит через открытый api. 

---

## Что умеет

- **Мультипарный TabBar** - открытие до 8 пар одновременно, мгновенное переключение
- **Свечной график** - живой стрим через `lightweight-charts`, выбор интервала (1m / 5m / 15m / 1h / 4h / 1d)
- **Стакан ордеров** - обновление в реальном времени, выбор глубины (10 / 20 / 50 / 100 уровней), индикатор спреда
- **Лента сделок** - живые агрегированные трейды с цветовой маркировкой buy/sell
- **Watch-list** - сохраняется в `localStorage`, поиск пар с дебаунсом через Binance REST API
- **Динамические мета-теги** - title и description меняются в зависимости от открытой пары

---

## Архитектура

Проект построен по **Feature-Sliced Design (FSD)** 

```
src/
├── app/
│   └── dashboard/
│       ├── layout.tsx
│       ├── page.tsx
│       ├── _DashboardIndexClient.tsx
│       └── [pair]/
│           └── page.tsx
│
├── widgets/
│   ├── CandlestickChart/
│   ├── OrderBook/
│   ├── TradeFeed/
│   ├── Sidebar/
│   ├── Topbar/
│   ├── RightPanel/
│   ├── NoPairFallback/
│   └── Statusbar/
│
├── features/
│   ├── add-pair/
│   ├── connect-ws/
│   └── connect-ticker/
│
├── entities/
│   ├── candle/
│   ├── order-book/
│   ├── trade/
│   ├── ticker/
│   ├── pair/
│   └── ws-status/
│
└── shared/
    ├── api/
    ├── ws/
    ├── config/
    ├── lib/
    ├── hooks/
    └── ui/
```

### WebSocket мультиплексор

Ключевое место в производительности это `BinanceWSManager`. Класс оборачивает одно WebSocket-соединение и раздаёт сообщения по типизированным хендлерам через `Map`. Сообщения не диспатчатся сразу на каждый `onmessage`, а складываются в буфер и сбрасываются пачкой на каждый тик `requestAnimationFrame`.

Используется два независимых экземпляра: `binanceWS` для комбо-стрима (klines + trades + depth) и `tickerWS` для 24h тикера.

### Динамические мета-теги

Все SEO-тексты лежат в `shared/config/seo.json`. Параметр `pair` из URL проходит через `sanitizePair` - функция принимает только строки вида `[A-Z0-9]{2,20}`, всё остальное отбрасывается и показывается фоллбек-метадата. Это закрывает отражённый XSS в мета-тегах и header injection.


## Стек

| Задача | Библиотека |
|---|---|
| Фреймворк | [Next.js 16](https://nextjs.org) - App Router, Server + Client компоненты |
| UI | [React 19](https://react.dev) |
| Язык | TypeScript 5 |
| Стейт | [Zustand 5](https://zustand.docs.pmnd.rs) - devtools + persist |
| Графики | [lightweight-charts 5](https://tradingview.github.io/lightweight-charts/) |
| HTTP | [ky 2](https://github.com/sindresorhus/ky) |
| Стили | SCSS Modules + CSS custom properties для темизации |
| Линтинг | [Biome 2](https://biomejs.dev) |
---

## Запуск

```bash
npm install
npm run dev
```

### Скрипты

```bash
npm run dev       # Дев-сервер
npm run build     # Продакшн-билд
npm run start     # Продакшн-сервер
npm run check     # Biome: линт + форматирование
npm run lint      # Только линт
npm run format    # Только форматирование (запись)
```

---

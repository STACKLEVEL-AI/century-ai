# Century AI regional sites

Production-ветки сайта:

| Домен | Ветка | Порт |
| --- | --- | --- |
| [century-ai.by](https://century-ai.by) | `century-ai.by` | `8090` |
| [century-ai.ru](https://century-ai.ru) | `century-ai.ru` | `8091` |

## Обновление production

В репозитории используются Git LFS для видео. Перед сборкой нужно скачать LFS-объекты, иначе Docker получит маленький pointer-файл вместо видео.

Git LFS должен быть установлен на сервере. Проверка:

```bash
git lfs version
```

Обычный порядок обновления:

```bash
git pull --ff-only
git lfs pull
sudo docker compose up -d --build
```

`git pull --ff-only` не создаёт случайных merge-коммитов. `docker compose down` обычно не нужен: `up -d --build` сам пересоздаст изменившиеся контейнеры.

Для RU:

```bash
cd /srv/century-ai/ru
git pull --ff-only && git lfs pull && sudo docker compose up -d --build
```

Для BY:

```bash
cd /srv/century-ai/by
git pull --ff-only && git lfs pull && sudo docker compose up -d --build
```

Проверьте SSH remote:

```bash
git remote -v
```

Ожидаемый вид:

```text
origin  git@github-century-ai:STACKLEVEL-AI/century-ai.git (fetch)
origin  git@github-century-ai:STACKLEVEL-AI/century-ai.git (push)
```

После `git lfs pull` размер главного видео должен быть около 20 MB:

```bash
wc -c public/hero-video/century-main-visual.mp4
```

Ожидаемое значение: `21646405`. Если вывод около `133` байт или начинается с `version https://git-lfs.github.com/spec/v1`, это ещё LFS-pointer — повторите `git lfs pull` и не запускайте сборку до загрузки объекта.

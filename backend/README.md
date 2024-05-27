

## How to use it

___
```shell
poetry install
```
3. set your supabase env

```shell
export SUPABASE_URL=your_supabase_url
export SUPABASE_KEY=your_supabase_key
export SUPERUSER_EMAIL=your_superuser_email
export SUPERUSER_PASSWORD=your_superuser_password
```
4. config fastapi settings
```python
# src/app/core/config.py
class Settings(BaseSettings):
    API_V1_STR: str = "/api/v1"
    SUPABASE_URL: str = Field(default_factory=lambda: os.getenv("SUPABASE_URL"))
    SUPABASE_KEY: str = Field(default_factory=lambda: os.getenv("SUPABASE_KEY"))
    SUPERUSER_EMAIL: str = Field(default_factory=lambda: os.getenv("SUPERUSER_EMAIL"))
    SUPERUSER_PASSWORD: str = Field(default=lambda: os.getenv("SUPERUSER_PASSWORD"))
    # SERVER_NAME: str
    SERVER_HOST: AnyHttpUrl = "https://localhost"
    SERVER_PORT: int = 8000
    BACKEND_CORS_ORIGINS: list[AnyHttpUrl] = []
    PROJECT_NAME: str = "fastapi supabase template"
    Config: ClassVar[ConfigDict] = ConfigDict(arbitrary_types_allowed=True)
```
5. run server
```shell
poetry run uvicorn src.app.main:app --reload
```

## Roadmap 🫶
___

- [x] FastAPI backend
    - [x] **standard** structure
      for <a href="https://github.com/tiangolo/fastapi" class="external-link" target="_blank">**FastAPI**</a> project
  ```text
  ── src
  │   └── app
  │       ├── api
  │       │   ├── api_v1
  │       │   │   ├── endpoints
  │       │   │   │   ├── __init__.py
  │       │   │   │   └── items.py
  │       │   │   ├── __init__.py
  │       │   │   └── api.py
  │       │   ├── __init__.py
  │       │   └── deps.py
  │       ├── core
  │       │   ├── __init__.py
  │       │   ├── config.py
  │       │   └── events.py
  │       ├── crud
  │       │   ├── __init__.py
  │       │   ├── base.py
  │       │   └── crud_item.py
  │       ├── schemas
  │       │   ├── __init__.py
  │       │   ├── auth.py
  │       │   ├── base.py
  │       │   ├── item.py
  │       │   └── msg.py
  │       ├── services
  │       │   └── __init__.py
  │       ├── utils
  │       │   └── __init__.py
  │       ├── __init__.py
  │       └── main.py
  ...

This project is licensed under the terms of the MIT license.

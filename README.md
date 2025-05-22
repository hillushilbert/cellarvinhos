# 🧪 Teste Técnico – Desenvolvedor(a) Sênior PHP/Laravel

## Instalação

    cp ./src/.env.example /src/.env

    docker compose build

    docker compose up -d

    docker compose exec app php artisan migrate
    docker compose exec app php artisan db:seed


## Link da app

Aplicação roda na url: http://localhost:8086

Usuário: admin@cellarvinhos.com.br
Senha: password

## Stack

    Laravel 11
    PHP 8.2
    Typescript 5
    Node18
    React18
    Tailwindcss4
    Inertia
    Mysql5.7
    Nginx1.3
    Laravel Breeze

## Testes

```sh
docker compose exec app php artisan test
``` 

    Os testes executam na mesmo banco de dados, o que faz com que os registros sejam apagados por conta do refresh datatabase usado nos testes.

## Observação

    Tentei usar o Design Template proposto porém para uso com react eu iria gastar um pouco mais de tempo, o que não casou com minha agenda esta semana. :(

## 📝 Descrição

Este teste tem como objetivo avaliar seus conhecimentos em desenvolvimento web full stack, com foco em **Laravel** no backend e **JS/jQuery ou Livewire, ou qualquer framework/biblioteca de Frontend**.

Você deverá criar uma aplicação de **Gestão de Chamados**, com funcionalidades de CRUD e filtragem. O sistema pode ser simples, mas deve seguir boas práticas, arquitetura limpa e integração adequada entre frontend e backend.

---

## 🔧 Funcionalidades Requeridas

### 🎯 Backend – Laravel
- Cadastro de **Categorias**
  - Campos: `id`, `name`, `created_at`, `created_by`
- Cadastro de **Chamados**
  - Campos: `id`, `title`, `description`, `status` (`aberto`, `em progresso`, `resolvido`), `category_id`, `created_at`, `created_by`

### 📌 Regras de negócio
- Chamado deve obrigatoriamente ter uma categoria associada
- Status padrão ao criar deve ser `aberto`
- Deletar categoria **só é permitido** se não houver chamados associados

### 🧩 Endpoints API (REST)
| Método | Rota                       | Descrição                        |
|--------|----------------------------|----------------------------------|
| GET    | /api/categories            | Listar categorias                |
| POST   | /api/categories            | Criar categoria                  |
| PUT    | /api/categories/{id}       | Atualizar categoria              |
| DELETE | /api/categories/{id}       | Deletar categoria                |
| GET    | /api/tickets               | Listar chamados (com filtros)    |
| POST   | /api/tickets               | Criar chamado                    |
| PUT    | /api/tickets/{id}          | Atualizar chamado                |
| DELETE | /api/tickets/{id}          | Deletar chamado                  |

---

## 🎨 Frontend (2 opções)

Você pode escolher entre:

### ✅ Blade + jQuery
- Formulário de cadastro de chamados
- Listagem com filtros por status e categoria (AJAX)
- Modal para edição dos chamados

### ✅ Frameworks/Bibliotecas de Frontend ou Livewire/Alpine.js
- SPA simples
- Listagem com filtros reativos
- Formulário de criação e edição com modais

---

## 🧪 Testes

- Inclua pelo menos:
  - 1 teste unitário
  - 1 teste de integração

Use **PHPUnit** ou **Pest**.

---

## 🛠️ Tecnologias Esperadas

- Laravel 10+
- Migrations e Seeders
- Eloquent ORM
- Form Requests para validação
- Bootstrap (opcional)
- Git para versionamento

---

## Observações finais

- Obrigatório: Você terá que utilizar o Design System deste repositório para criar o projeto. Clone-o e adeque-o de acordo com seu projeto Laravel. Por que que colocamos um ponto tão importante no final do readme? Para saber quem realmente leu todas as instruções.
- Você terá total **liberdade para utilizar** qualquer tipo de inteligência artificial para te ajudar a criar este projeto. 
- **Não é esperada** a utilização de IA como parte da ferramenta, mas, se tiver, será levada em consideração a forma que foi utilizada (se está bem estruturada, se está de acordo com regras e conceitos modernos de IA, etc).

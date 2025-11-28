# 📚 Documentação Completa - Dashboard de Monitoramento

## 🚀 Visão Geral
Dashboard de Monitoramento Remoto em Nuvem desenvolvido para a disciplina de Redes de Computadores. Permite monitorar métricas de servidores em tempo real.

## 🛠️ Tecnologias
- **Frontend**: Vue.js 3, HTML5, CSS3
- **Backend**: Node.js, Express
- **Deploy**: Render.com
- **Integração**: Python, Prometheus

## 📋 Estrutura do Projeto
```
monitoramento/
├── public/
│   └── index.html      # Dashboard Vue.js
├── server.js           # API Express
├── send_metrics.py     # Script de envio
├── package.json        # Dependências
└── .env               # Configurações
```

## 🚀 Como Executar Localmente

### Pré-requisitos
- Node.js 14+
- npm ou yarn
- Python 3.6+

### Passo a Passo
1. Instale as dependências:
   ```bash
   npm install
   ```

2. Inicie o servidor:
   ```bash
   npm start
   ```

3. Acesse o dashboard:
   ```
   http://localhost:3000
   ```

4. (Opcional) Envie métricas de teste:
   ```bash
   python3 send_metrics.py
   ```

## ☁️ Deploy em Nuvem (Render.com)

### Passo 1: Criar Conta
1. Acesse [Render.com](https://render.com)
2. Cadastre-se com GitHub

### Passo 2: Criar Web Service
1. Clique em "New +" → "Web Service"
2. Conecte seu repositório
3. Configure:
   - **Name**: monitoring-dashboard
   - **Region**: São Paulo
   - **Branch**: main
   - **Build Command**: npm install
   - **Start Command**: npm start
4. Clique em "Create Web Service"

### Passo 3: Acessar
Após o deploy (2-3 minutos), acesse:
```
https://monitoramento-5smo.onrender.com
```

## 🔄 Integração com Prometheus
Modifique o script `send_metrics.py`:
```python
# Para nuvem:
CLOUD_API = "https://monitoramento-5smo.onrender.com/api/receive-metrics"

# Para local:
# CLOUD_API = "http://localhost:3000/api/receive-metrics"
```

## 📊 Endpoints da API
- `GET /api/metrics` - Retorna métricas atuais
- `POST /api/receive-metrics` - Recebe métricas
- `GET /api/health` - Verifica saúde da API

## 🐛 Solução de Problemas

### Erro de Porta
```bash
# Se a porta 3000 estiver em uso:
PORT=3001 npm start
```

### Dependências
```bash
# Se houver erros de dependência:
rm -rf node_modules
npm cache clean --force
npm install
```
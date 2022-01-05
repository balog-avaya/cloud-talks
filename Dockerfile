FROM node:14.15-slim AS build

WORKDIR /app
COPY src/ ./src/
COPY ["package.json", "package-lock.json", \
      "tsconfig.json", "tsconfig.build.json", \
      "nest-cli.json", "./" \
     ]

RUN npm install && npm run build
RUN rm -rf node_modules && npm install --only=prod

FROM node:14.15-slim

WORKDIR /app

COPY --from=build /app/node_modules/ node_modules/
COPY --from=build /app/dist/ dist/
COPY --from=build ["/app/package.json", \
     		   "/app/package-lock.json", \
      		   "./" \
     		  ]

CMD ["npm", "run", "start:prod"]

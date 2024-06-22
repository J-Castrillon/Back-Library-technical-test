import swaggerJSDoc from "swagger-jsdoc";
import { SwaggerUiOptions } from "swagger-ui-express";

const options: swaggerJSDoc.Options = {
  swaggerDefinition: {
    openapi: "3.0.2",
    tags: [
      {
        name: "Programs",
        description: "API operations related to Programs",
      },
      {
        name: "Students",
        description: "API operations related to Students",
      },
      {
        name: "Assets",
        description: "API operations related to Assets",
      },
      {
        name: "Loans",
        description: "API operations related to Loans",
      },
    ],
    info: {
      title: "REST API Node.js / Express / TypeScript",
      version: "0.0.1",
      description: "API Docs for library management",
    },
  },
  apis: [
    "./src/routers/programs.ts",
    "./src/routers/students.ts",
    "./src/routers/assets.ts",
    "./src/routers/loans.ts",
  ],
};

// Especifications;
const swaggerSpec = swaggerJSDoc(options);

const swaggerUiOptions: SwaggerUiOptions = {
  customCss: `
        .topbar-wrapper .link {
            content: url('/sources/books.svg'); 
            height: 120px; 
            width: auto; 
        }

        .swagger-ui .topbar{
            background-color: #2b3b45; 
        }
    `,

  customSiteTitle: "Documentation Library",
};

export default swaggerSpec;
export { swaggerUiOptions };

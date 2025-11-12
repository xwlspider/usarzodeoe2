# EMILY OJEDA - INSUMO 1

## ¿Qué es Zod?

Zod es una biblioteca de declaración y validación de esquemas TypeScript-first. En otras palabras, es una herramienta que te permite definir la forma que deberían tener tus datos (su "esquema") y luego validar si los datos que recibes o manipulas coinciden con esa forma.

**Características principales de Zod:**

*   **TypeScript-first:** Diseñado específicamente para funcionar de manera óptima con TypeScript, proporcionando inferencia de tipos estática y garantizando la seguridad de tipos.
*   **Simple y conciso:** Permite definir esquemas complejos con una sintaxis clara y fácil de entender.
*   **Poderoso:** Soporta una amplia gama de tipos de datos (strings, numbers, booleans, objetos, arrays, fechas, etc.) y validaciones complejas (regex, rangos, transformaciones, uniones, etc.).
*   **Inmutable:** Las operaciones sobre esquemas Zod devuelven nuevas instancias, lo que ayuda a prevenir efectos secundarios no deseados.
*   **Personalizable:** Permite añadir mensajes de error personalizados y validaciones personalizadas.

## ¿Cómo funciona la validación con Zod?

El proceso de validación con Zod generalmente sigue estos pasos:

1.  **Definir un esquema:** Creas un objeto de esquema Zod que describe la estructura y los tipos de datos esperados. Por ejemplo, `z.object({ name: z.string(), age: z.number().positive() })`.
2.  **Recibir datos:** Tienes algún dato de entrada (por ejemplo, de una API, un formulario, un archivo JSON).
3.  **Validar los datos:** Pasas los datos al método `.parse()` o `.safeParse()` de tu esquema.
    *   `.parse()`: Si los datos cumplen con el esquema, devuelve los datos validados (con inferencia de tipos de TypeScript). Si no cumplen, lanza un error (`ZodError`).
    *   `.safeParse()`: Siempre devuelve un objeto de resultado que indica si la validación fue exitosa (`success: true`) o no (`success: false`, incluyendo los errores). Esto es útil para manejar errores de forma controlada sin usar `try-catch`.
4.  **Manejar el resultado:**
    *   Si la validación es exitosa, puedes usar los datos validados con la confianza de que tienen el tipo y la estructura correctos.
    *   Si falla, puedes acceder a los detalles de los errores de validación para informar al usuario o depurar.

**Ejemplo básico:**

```typescript
import { z } from 'zod';

const UserSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(3, { message: "El nombre debe tener al menos 3 caracteres." }),
  email: z.string().email({ message: "Formato de email inválido." }),
  age: z.number().int().min(18, { message: "Debes ser mayor de 18 años." }).optional(), // Opcional
});

type User = z.infer<typeof UserSchema>; // Inferencia de tipo TypeScript

const validUser = {
  id: "a1b2c3d4-e5f6-7890-1234-567890abcdef",
  name: "Juan Pérez",
  email: "juan.perez@example.com",
  age: 30,
};

const invalidUser = {
  id: "invalid-uuid",
  name: "Jo",
  email: "invalid-email",
};

// Usando .parse()
try {
  const parsedUser = UserSchema.parse(validUser);
  console.log("Usuario válido:", parsedUser);
} catch (error) {
  console.error("Error de validación (parse):", error);
}

// Usando .safeParse()
const resultInvalid = UserSchema.safeParse(invalidUser);

if (resultInvalid.success) {
  console.log("Usuario válido (safeParse):", resultInvalid.data);
} else {
  console.error("Errores de validación (safeParse):", resultInvalid.error.errors);
  /*
  [
    {
      "code": "invalid_string",
      "validation": "uuid",
      "message": "Invalid uuid",
      "path": ["id"]
    },
    {
      "code": "too_small",
      "minimum": 3,
      "type": "string",
      "inclusive": true,
      "message": "El nombre debe tener al menos 3 caracteres.",
      "path": ["name"]
    },
    {
      "code": "invalid_string",
      "validation": "email",
      "message": "Formato de email inválido.",
      "path": ["email"]
    }
  ]
  */
}
```

## ¿Cómo funciona este programa usando Zod?

Este programa utiliza Zod para [**Aquí deberías describir el propósito específico de tu aplicación y cómo integra Zod.** Por ejemplo, si es una API, una aplicación frontend, etc.]

A continuación, se detalla dónde y cómo se implementa Zod:

1.  **Definición de Esquemas:**
    *   **Archivo/Ubicación:** `src/schemas/miEsquema.ts` (ejemplo)
    *   **Descripción:** Se han definido esquemas Zod para la validación de [Menciona qué entidades o datos se validan, por ejemplo: "datos de entrada de usuarios", "configuración de la aplicación", "parámetros de URL", "carga útil de solicitudes HTTP"]. Estos esquemas aseguran que los datos recibidos o generados cumplan con una estructura y tipos esperados.
    *   **Ejemplo:**
        ```typescript
        // src/schemas/productSchema.ts
        import { z } from 'zod';

        export const ProductSchema = z.object({
          name: z.string().min(5, "El nombre del producto debe tener al menos 5 caracteres."),
          price: z.number().positive("El precio debe ser un número positivo."),
          description: z.string().optional(),
          category: z.enum(["electronics", "clothing", "books"], {
            errorMap: () => ({ message: "Categoría inválida." })
          }),
        });

        export type Product = z.infer<typeof ProductSchema>;
        ```

2.  **Middleware de Validación (si aplica en una API/Servidor):**
    *   **Archivo/Ubicación:** `src/middleware/validateRequest.ts` (ejemplo) o directamente en los *controllers*.
    *   **Descripción:** En las rutas de la API, se utiliza un *middleware* o una función de validación que emplea los esquemas Zod. Antes de procesar una solicitud (POST, PUT), los datos del `body`, `query` o `params` se pasan por el esquema Zod correspondiente.
    *   **Beneficio:** Si la validación falla, se retorna un error HTTP 400 (Bad Request) con un mensaje descriptivo, evitando que datos incorrectos lleguen a la lógica de negocio o a la base de datos.
    *   **Ejemplo (Express.js):**
        ```typescript
        // src/middleware/validateRequest.ts
        import { Request, Response, NextFunction } from 'express';
        import { AnyZodObject, ZodError } from 'zod';

        const validate = (schema: AnyZodObject) =>
          async (req: Request, res: Response, next: NextFunction) => {
            try {
              await schema.parseAsync({
                body: req.body,
                query: req.query,
                params: req.params,
              });
              next();
            } catch (error) {
              if (error instanceof ZodError) {
                return res.status(400).json({
                  status: "error",
                  message: "Datos de entrada inválidos",
                  errors: error.flatten().fieldErrors,
                });
              }
              next(error); // Pasa otros errores al siguiente middleware
            }
          };

        export default validate;
        ```
        ```typescript
        // src/routes/products.ts
        import { Router } from 'express';
        import validate from '../middleware/validateRequest';
        import { ProductSchema } from '../schemas/productSchema';

        const router = Router();

        router.post('/products', validate(ProductSchema), (req, res) => {
          // Si llegamos aquí, req.body ya está validado por ProductSchema
          const newProduct = req.body;
          // ... lógica para guardar el producto
          res.status(201).json({ message: "Producto creado", product: newProduct });
        });

        export default router;
        ```

3.  **Validación de Entorno/Configuración (si aplica):**
    *   **Archivo/Ubicación:** `src/config/env.ts` (ejemplo)
    *   **Descripción:** Zod también se utiliza para validar las variables de entorno al inicio de la aplicación. Esto asegura que todas las configuraciones necesarias estén presentes y tengan el formato correcto, evitando fallos inesperados en tiempo de ejecución.
    *   **Ejemplo:**
        ```typescript
        // src/config/env.ts
        import { z } from 'zod';

        const envSchema = z.object({
          NODE_ENV: z.enum(["development", "production", "test"]),
          PORT: z.string().transform(Number).default("3000"),
          DATABASE_URL: z.string().url(),
          API_KEY: z.string().min(10),
        });

        // Validar las variables de entorno al iniciar la aplicación
        export const env = envSchema.parse(process.env);
        ```

Al integrar Zod de esta manera, el programa garantiza una alta fiabilidad en el manejo de datos, proporciona una excelente experiencia de desarrollo con TypeScript y facilita la depuración de problemas relacionados con la estructura de los datos.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.

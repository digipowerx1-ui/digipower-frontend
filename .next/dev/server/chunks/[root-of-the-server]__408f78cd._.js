module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[project]/src/app/api/revalidate/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET,
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/cache.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
;
;
// Secret token to secure the webhook - set this in your environment variables
const REVALIDATION_SECRET = process.env.REVALIDATION_SECRET;
async function POST(request) {
    try {
        // Get the secret from query params or headers
        const { searchParams } = new URL(request.url);
        const secret = searchParams.get('secret') || request.headers.get('x-revalidation-secret');
        // Validate the secret token
        if (REVALIDATION_SECRET && secret !== REVALIDATION_SECRET) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Invalid secret token'
            }, {
                status: 401
            });
        }
        // Parse the request body to get the content type
        let body = {};
        try {
            body = await request.json();
        } catch  {
        // Body might be empty for simple revalidation calls
        }
        const model = body.model?.toLowerCase() || searchParams.get('model')?.toLowerCase();
        const paths = [];
        // Determine which paths to revalidate based on the Strapi model
        switch(model){
            case 'press-release':
            case 'press-releases':
                paths.push('/press-releases');
                paths.push('/investor-relations'); // Also shows press releases
                // If a specific entry was updated, revalidate its detail page too
                if (body.entry?.id) {
                    paths.push(`/press-releases/${body.entry.id}`);
                }
                break;
            case 'sec-filing':
            case 'sec-filings':
                paths.push('/sec-filings');
                break;
            case 'open-position':
            case 'open-positions':
                paths.push('/career');
                break;
            default:
                // If no specific model, revalidate common pages
                if (!model) {
                    paths.push('/press-releases');
                    paths.push('/sec-filings');
                    paths.push('/investor-relations');
                }
        }
        // Revalidate all the paths
        for (const path of paths){
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["revalidatePath"])(path);
        }
        console.log(`[Revalidation] Triggered for model: ${model || 'all'}, paths: ${paths.join(', ')}`);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            revalidated: true,
            paths,
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        console.error('Error during revalidation:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Failed to revalidate',
            message: error instanceof Error ? error.message : 'Unknown error'
        }, {
            status: 500
        });
    }
}
async function GET(request) {
    return POST(request);
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__408f78cd._.js.map
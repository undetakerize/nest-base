import { registerAs } from "@nestjs/config";

export default registerAs('keycloak', () => ({
    keycloakAuth : process.env.KEYCLOAK_AUTH,
    keycloakRealm : process.env.KEYCLOAK_REALM,
    keycloakClientId : process.env.KEYCLOAK_CLIENT_ID,
    keycloakSecret : process.env.KEYCLOAK_SECRET,
    keycloakLogLevel : process.env.KEYCLOAK_LOG_LEVEL,
    keycloakNestLogger : process.env.KEYCLOAK_NEST_LOGGER,
    keycloakPolicyEnv : process.env.KEYCLOAK_POLICY_ENV,
    keycloakTokenValidation: process.env.KEYCLOAK_TOKEN_VALIDATION,
}));
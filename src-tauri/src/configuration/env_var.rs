use super::error::ConfigurationError;

pub(crate) enum EnvVar {
    CoreApiUrl,
    LauncherApiUrl,
    NdibApiUrl,
    SupabaseUrl,
}

impl EnvVar {
    pub(crate) fn as_str(&self) -> &str {
        match self {
            EnvVar::CoreApiUrl => "CORE_API_URL",
            EnvVar::LauncherApiUrl => "LAUNCHER_API_URL",
            EnvVar::NdibApiUrl => "NDIB_API_URL",
            EnvVar::SupabaseUrl => "SUPABASE_URL",
        }
    }

    pub(crate) fn get_value(&self) -> Result<String, ConfigurationError> {
        Ok(std::env::var(self.as_str())?)
    }
}

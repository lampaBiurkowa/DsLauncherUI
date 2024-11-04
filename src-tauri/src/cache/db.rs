pub(crate) struct Db {
    db: Db
}

const DB_NAME: &str = "cache";
const CACHE_NAME: &str = "cache";
const USERNAME: &str = "root";
const PASSWORD: &str = "root";

impl Db {
    pub(crate) async fn try_connect() -> Result<Self, CacheError> {
        let db = Surreal::new::<Db>("mem://").await?;
        db.signin(Root { username: USERNAME, password: PASSWORD }).await?;
        db.use_ns(CACHE_NAME).use_db(DB_NAME).await?;
        Ok(Self { db })
    }
}
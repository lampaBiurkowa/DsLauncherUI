// use reqwest::{Error, Client};

// pub struct DsIdentityClient {
//     base_url: String,
//     client: Client,
// }

// impl DsIdentityClient {
//     pub fn new(base_url: &str) -> Self {
//         Self {
//             base_url: base_url.to_string(),
//             client: Client::new(),
//         }
//     }

//     pub async fn login(&self, user_id: &str, password_base64: &str) -> Result<String, Error> {
//         let url = format!("{}/Auth/login/{}", self.base_url, user_id);

//         let response = self.client.post(&url)
//             .query(&[("passwordBase64", password_base64)])
//             .send()
//             .await?;

//         let token = response.text().await?;
//         Ok(token)
//     }

//     pub async fn get_user_guid(&self, user_login: &str) -> Result<String, Error> {
//         let url = format!("{}/User/GetId/{}", self.base_url, user_login);

//         let response = self.client.get(&url)
//             .send()
//             .await?;

//         let id = response.text().await?.trim_matches('"').to_string();
//         Ok(id)
//     }
// }

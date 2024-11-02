pub(crate) trait VecStringExt {
    fn add_if_non_empty(&mut self, str: String);
}

impl VecStringExt for Vec<String> {
    fn add_if_non_empty(&mut self, str: String) {
        if !is_empty_or_whitespace(&str) {
            self.push(str);
        }
    }
}

fn is_empty_or_whitespace(s: &str) -> bool {
    s.trim().is_empty() || s.chars().all(char::is_whitespace)
}

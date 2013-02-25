var secret_code = "magic"

function getTextFromHtml(html) {
  return getTextFromNode(Xml.parse(html, true).getElement());
}

function getTextFromNode(x) {
  switch(x.toString()) {
    case 'XmlText': return x.toXmlString();
    case 'XmlElement': return x.getNodes().map(getTextFromNode).join('');
    default: return '';
  }
}
function doGet(e) {
  Logger.log(e)
  var found = false
  if (String(e.parameter.secret) !== secret_code) {
   return ContentService.createTextOutput("<id>Unauthorised</id>").setMimeType(ContentService.MimeType.TEXT)
 }
 Logger.log("Auth")
 var  Gmail = GmailApp
 var package = "<id>None found<id>"
 var Inbox_Threads = GmailApp.getInboxThreads(0, 50);
 Logger.log("Threads")
 for (var i = 0; i < Inbox_Threads.length; i++) {
   if( String(Inbox_Threads[i].getFirstMessageSubject()).substring(0,5) == "[CC] ") {
    package = packageEmail(Inbox_Threads[i])
    found = true
    Logger.log("FOUND")
    Logger.log(package)
    break
  }
}
if (found == false) {
  return ContentService.createTextOutput("<id>None Found</id>").setMimeType(ContentService.MimeType.TEXT)
}else {
 return ContentService.createTextOutput(package).setMimeType(ContentService.MimeType.TEXT)
}
}


function packageEmail(message) {
  Logger.log("Packaging")
  lua_table = '<id>package = { email_subject = "!subject!", email_body = "!body!"}</id>'
  email_subject = message.getFirstMessageSubject().substring(5,message.length)
  Logger.log(email_subject)
  email_body = getTextFromHtml(message.getMessages()[0].getBody())
  Logger.log(email_body)
  lua_table = lua_table.replace(/!subject!/,email_subject)
  lua_table = lua_table.replace(/!body!/,email_body)
  Logger.log("Packaged")
  return lua_table
}
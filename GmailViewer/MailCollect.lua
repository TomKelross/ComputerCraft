
macro_code = "Your Macro Code WOuld Go Here"
secret = "magic"
printer = peripheral.wrap("right")
http.request("https://script.google.com/macros/s/" .. macro_code .."/exec?secret=" .. secret)

 local requesting = true

 while requesting do

   local event, url, sourceText = os.pullEvent()

   if event == "http_success" then

     local respondedText = sourceText.readAll()
     respondedText = respondedText
     cleanText = string.gsub(respondedText,"\n","")
     if string.find(respondedText,"package") then
      assert(loadstring(cleanText))()
      print("----------------------")
      print(package["email_subject"])
      print("-----------------------")
      print(package["email_body"])
    end
     
     requesting = false

   elseif event == "http_failure" then

     print("Server didn't respond.")
     print(":(")

     requesting = false

   end
 end



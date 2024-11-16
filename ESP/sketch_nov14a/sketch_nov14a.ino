#include <ESP8266WiFi.h>   // Dla ESP8266
#include <ESP8266HTTPClient.h>

// Ustawienia Wi-Fi
const char* ssid = "PLAY_internet_2.4G_B99";
const char* password = "PeRfHs9K";

// Adres URL serwera
String serverName = "http://192.168.101.7:5000/api/set-parameters";

unsigned long lastTime = 0;
unsigned long timerDelay = 5000;

void setup() {
  Serial.begin(115200); 

  WiFi.begin(ssid, password);
  Serial.println("Connecting");
  while(WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.print("Connected to WiFi network with IP Address: ");
  Serial.println(WiFi.localIP());
 
  Serial.println("Timer set to 5 seconds (timerDelay variable), it will take 5 seconds before publishing the first reading.");
}

void loop() {
  //Send an HTTP POST request every 10 minutes
  if ((millis() - lastTime) > timerDelay) {
    //Check WiFi connection status
    if(WiFi.status()== WL_CONNECTED){
      WiFiClient client;
      HTTPClient http;
      
      // Your Domain name with URL path or IP address with path
      http.begin(client, serverName);
      Serial.println("Server path");
      Serial.println(serverName);
      
      float temperature = 23.5;
      int frequency = 100;

      // Ustalanie danych w formacie JSON
      String jsonPayload = "{\"voltage\": 220, \"current\": 10, \"energy\": 1000}"; // Dodany średnik

      // Ustawienie nagłówka Content-Type
      http.addHeader("Content-Type", "application/json");
      int httpResponseCode = http.POST(jsonPayload);
      
      if (httpResponseCode>0) {
        Serial.print("HTTP Response code: ");
        Serial.println(httpResponseCode);
        String payload = http.getString();
        Serial.println(payload);
      }
      else {
        Serial.print("Error code: ");
        Serial.println(httpResponseCode);
      }
      // Free resources
      http.end();
    }
    else {
      Serial.println("WiFi Disconnected");
    }
    lastTime = millis();
  }
}
      

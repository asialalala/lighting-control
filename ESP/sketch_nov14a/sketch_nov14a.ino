#include <ESP8266WiFi.h>  // Dla ESP8266
#include <ESP8266HTTPClient.h>
#include <PZEM004Tv30.h>

// Define the pins for RX and TX on ESP8266
/* Use software serial for the PZEM
 * Pin 12 Rx (Connects to the Tx pin on the PZEM)
 * Pin 13 Tx (Connects to the Rx pin on the PZEM)
*/
#if !defined(PZEM_RX_PIN) && !defined(PZEM_TX_PIN)
#define PZEM_RX_PIN 12
#define PZEM_TX_PIN 13
#endif

// Ustawienia Wi-Fi
const char* ssid = "PLAY_internet_2.4G_B99";
const char* password = "PeRfHs9K";

// Adres URL serwera
String serverName = "http://192.168.101.7:5000/api/set-parameters";

// Initialize the PZEM with the defined pins
SoftwareSerial pzemSWSerial(PZEM_RX_PIN, PZEM_TX_PIN);
PZEM004Tv30 pzem(pzemSWSerial);

unsigned long lastTime = 0;
unsigned long timerDelay = 500;

void setup() {
  Serial.begin(115200);

  WiFi.begin(ssid, password);
  Serial.println("Connecting");
  while (WiFi.status() != WL_CONNECTED) {
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

    float voltage = pzem.voltage();
    float current = pzem.current();
    float power = pzem.power();
    float energy = pzem.energy();
    if (!isnan(voltage) && !isnan(current) && !isnan(power) && !isnan(energy)) {
      //Check WiFi connection status
      if (WiFi.status() == WL_CONNECTED) {
        WiFiClient client;
        HTTPClient http;

        // Your Domain name with URL path or IP address with path
        http.begin(client, serverName);
        Serial.println("Server path");
        Serial.println(serverName);

        // Tworzenie JSON-a z danymi
        String jsonPayload = "{\"voltage\": " + String(voltage, 2) + ", \"current\": " + String(current, 2) + ", \"energy\": " + String(energy, 2) + "}";

        // Ustawienie nagłówka Content-Type
        http.addHeader("Content-Type", "application/json");
        int httpResponseCode = http.POST(jsonPayload);
        Serial.println("Payload: ");
        Serial.println(jsonPayload);

        if (httpResponseCode > 0) {
          Serial.print("HTTP Response code: ");
          Serial.println(httpResponseCode);
          String payload = http.getString();
          Serial.println(payload);
        } else {
          Serial.print("Error code: ");
          Serial.println(httpResponseCode);
        }
        // Free resources
        http.end();
      } else {
        Serial.println("WiFi Disconnected");
      }
    } else {
      Serial.println("Problem with gettning energy/current/power/voltage");
      Serial.println("Voltage: ");
      Serial.println(voltage);
      Serial.println("Current: ");
      Serial.println(current);
      Serial.println("Power: ");
      Serial.println(power);
      Serial.println("Energy: ");
      Serial.println(energy);
    }
    lastTime = millis();
  }

}

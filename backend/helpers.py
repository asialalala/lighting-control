import json

# Wczytanie pliku JSON
# with open('plik.json', 'r') as file:
#     data = json.load(file)

# Funkcja do wyciągnięcia danych czujnika
def parse_sensor_data(data):
    sensors = data.get("Sensors", [])
    
    # Iterowanie przez czujniki w pliku JSON
    for sensor in sensors:
        task_values = sensor.get("TaskValues", [])
        
        for value in task_values:
            value_name = value.get("Name")
            value_data = value.get("Value")
            
            print(f"{value_name}: {value_data}")

# # Wywołanie funkcji, aby wypisać wartości
# parse_sensor_data(data)

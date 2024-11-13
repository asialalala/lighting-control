def parse_sensor_data(data):
    sensors = data.get("Sensors", [])
    parsed_data = {}

    for sensor in sensors:
        task_values = sensor.get("TaskValues", [])
        
        for value in task_values:
            value_name = value.get("Name")
            value_data = value.get("Value")
            
            parsed_data[value_name] = value_data

    return parsed_data

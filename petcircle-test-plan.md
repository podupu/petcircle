# Test Plan: Inventory Management Integration for PetCircle

## 1. Introduction

### Objective
Validate the integration of inventory adjustments between PetCircle's internal inventory management system and multiple third-party logistics providers (3PLs).

### Scope
- Ensure that inventory adjustments are accurately reflected across PetCircle's internal system and all 3PL systems.
- Verify that each adjustment is auditable and traceable to the customer service agent.
- Test both positive and negative inventory adjustments.

## 2. Assumptions

1. **System Availability**: The internal inventory management system and all third-party logistics (3PL) systems are operational and accessible for testing.

2. **API Endpoints**: REST API endpoints for communication between PetCircle's internal system and 3PL systems are available, documented, and have been implemented.

3. **Data Consistency**: The internal system and 3PL systems have an initial data synchronization to ensure starting inventory levels are consistent across systems.

4. **User Access**: Test accounts with appropriate permissions for customer service agents are available for executing inventory adjustments.

5. **Error Handling**: The system includes mechanisms for error handling and logging, including retry policies for API failures.

7. **Test Data**: Test data for products, warehouses, and inventory levels is available and reflects a variety of scenarios for testing purposes.

8. **Load and Stress Testing Tools**: Tools and environments for performance, load, and stress testing are set up and available.

9. **Rollback Procedures**: Rollback procedures for inventory adjustments are defined and tested to ensure they can handle failure scenarios effectively.

10. **Documentation**: Comprehensive API documentation and integration guidelines are available to ensure accurate testing of communication between systems.

## 3. Prerequisites

1. **Test Environment Setup**
   - Test environments for PetCircle's internal systems and 3PL systems are configured and accessible.
   - Test databases are initialized with sample data reflecting real-world scenarios.

2. **API Integration**
   - Ensure that the API endpoints are configured and tested for connectivity and correct data format.

3. **Test Accounts**
   - Create and configure test accounts for customer service agents with the necessary permissions to perform inventory adjustments.

4. **Communication Channels**
   - Confirm that channels for reporting issues (e.g., communication with the development team, 3PL support) are established and operational.

5. **Performance Testing Setup**
   - Set up performance testing tools and scripts to simulate high loads and stress scenarios.

6. **Error Handling Configuration**
   - Verify that error handling and retry mechanisms are properly configured in the integration layer.

7. **Backup and Recovery**
   - Ensure backup and recovery procedures are in place to restore systems to a stable state if needed during testing.

8. **Test Plan Review**
   - Review and finalize the test plan with stakeholders to ensure all scenarios are covered and understood.

9. **Training**
   - Ensure that testers are trained on the new feature and testing procedures to ensure accurate execution and reporting.

## 4. Inventory Adjustments

**Definition**: Inventory adjustments are changes made to the stock levels of products. These adjustments can be:
- **Positive Adjustment**: Increasing the inventory level of a product (e.g., receiving new stock).
- **Negative Adjustment**: Decreasing the inventory level of a product (e.g., product sale or loss).

**Examples**:
- **Positive Adjustment**: Adding 100 units of "Organic Dog Food" to the inventory at the "SYD-Warehouse-1."
- **Negative Adjustment**: Removing 50 units of "Cat Toys" from inventory at both "NSW-Warehouse-1" and "BRISBANE-Warehouse-2."

## 5. Third-Party Logistics (3PL) Providers

**Examples**:
1.Toll Group: One of Australia’s largest logistics providers, offering comprehensive services including warehousing, shipping, and supply chain management.
2.Linfox: Major logistics provider specializing in warehousing, transportation, and supply chain management across various industries.
3.DPD Australia (Direct Parcel Distribution): Provides logistics and warehousing solutions tailored for e-commerce and retail businesses.
4.Australia Post (StarTrack): Provides logistics and warehousing services through its StarTrack division, suitable for various business needs.
## 6. Test Scenarios

### Functional Testing

1. **Single Warehouse Adjustment**
   - **Scenario**: PetCircle adjusts the inventory of "Organic Dog Food" by adding 100 units to the warehouse "SYD-Warehouse-1."
   - **Steps**:
     a. Log in as a customer service agent.
     b. Navigate to the inventory adjustment screen.
     c. Select "Organic Dog Food" from the product list.
     d. Choose "SDY-Warehouse-1" as the warehouse.
     e. Enter "+100" as the adjustment value.
     f. Submit the adjustment.
   - **Expected Result**: 
     - The inventory level of "Organic Dog Food" should increase by 100 units in both the internal system and the "SYD-Warehouse-1" system.
     - The adjustment should be reflected immediately in real-time inventory reports.
     - An event log entry should be created with the agent's ID, timestamp, product, warehouse, and adjustment amount.

2. **Multiple Warehouse Adjustment**
   - **Scenario**: PetCircle adjusts the inventory of "Cat Toys" by removing 50 units. This adjustment affects "NSWWarehouse-1" and "BRISBANE-Warehouse-2."
   - **Steps**:
     a. Log in as a customer service agent with multi-warehouse permissions.
     b. Navigate to the multi-warehouse inventory adjustment screen.
     c. Select "Cat Toys" from the product list.
     d. Choose both "NSWWarehouse-1" and "BRISBANE-Warehouse-2" from the warehouse list.
     e. Enter "-50" as the adjustment value.
     f. Submit the adjustment.
   - **Expected Result**: 
     - The inventory level of "Cat Toys" should decrease by 50 units in both "NSWWarehouse-1" and "BRISBANE-Warehouse-2" systems.
     - The internal system should show a total reduction of 100 units (50 from each warehouse).
     - Separate audit log entries should be created for each warehouse adjustment.

3. **Audit Trail**
   - **Scenario**: Customer service agent "CS-Agent-123" adjusts the inventory for "Bird Feed" by adding 30 units.
   - **Steps**:
     a. Log in as "CS-Agent-123".
     b. Perform an inventory adjustment of +30 units for "Bird Feed" in any warehouse.
     c. Navigate to the audit trail section.
     d. Filter the audit log for today's date and "Bird Feed" product.
   - **Expected Result**: 
     - The adjustment should be logged with "CS-Agent-123" in the audit trail, showing the change of 30 units.
     - The log entry should include: agent ID (CS-Agent-123), timestamp, product (Bird Feed), warehouse, adjustment amount (+30), and resulting inventory level.

4. **Batch Adjustment**
   - **Scenario**: Perform a batch adjustment for multiple products across different warehouses.
   - **Steps**:
     a. Log in as a manager with batch adjustment permissions.
     b. Navigate to the batch adjustment screen.
     c. Upload a CSV file containing adjustments for 10 different products across 3 warehouses.
     d. Review the adjustments and confirm the batch process.
   - **Expected Result**: 
     - All 10 products should have their inventory levels adjusted correctly in the respective warehouses.
     - The internal system and 3PL systems should reflect consistent inventory levels post-adjustment.
     - Audit logs should show individual entries for each adjustment in the batch.

### Negative Scenarios

1. **Invalid Inventory Adjustment**
   - **Scenario**: Attempt to adjust the inventory of "Dog Leashes" by entering "abc" as the adjustment value.
   - **Steps**:
     a. Log in as a customer service agent.
     b. Navigate to the inventory adjustment screen.
     c. Select "Dog Leashes" from the product list.
     d. Enter "abc" in the adjustment field.
     e. Attempt to submit the adjustment.
   - **Expected Result**: 
     - The system should reject the invalid input.
     - An error message should appear, indicating that only integers are allowed for inventory adjustments.
     - No changes should be made to the inventory levels.

2. **Non-Existent Warehouse**
   - **Scenario**: Attempt to adjust the inventory of "Fish Tanks" in a warehouse "NonExistent-Warehouse."
   - **Steps**:
     a. Log in as a customer service agent.
     b. Manually edit the warehouse field in the adjustment form to "NonExistent-Warehouse".
     c. Select "Fish Tanks" and enter an adjustment value.
     d. Attempt to submit the adjustment.
   - **Expected Result**: 
     - The system should detect the invalid warehouse and prevent the adjustment.
     - An error message should indicate that the selected warehouse does not exist.
     - The error should be logged for system administrators to review.

3. **Insufficient Inventory for Negative Adjustment**
   - **Scenario**: Attempt to remove more units than available in inventory.
   - **Steps**:
     a. Log in as a customer service agent.
     b. Select a product with current inventory of 50 units.
     c. Attempt to adjust the inventory by -100 units.
     d. Submit the adjustment.
   - **Expected Result**: 
     - The system should prevent the adjustment and display an error message.
     - The error message should indicate that the requested adjustment exceeds available inventory.
     - No changes should be made to the inventory levels.

### Edge Cases

1. **Zero Inventory Adjustment**
   - **Scenario**: Adjust the inventory of "Pet Beds" by adding 0 units.
   - **Steps**:
     a. Log in as a customer service agent.
     b. Navigate to the inventory adjustment screen.
     c. Select "Pet Beds" from the product list.
     d. Enter "0" as the adjustment value.
     e. Submit the adjustment.
   - **Expected Result**: 
     - The system should process the request without error.
     - No changes should be applied to the inventory level.
     - An audit log entry should be created, showing a 0 unit adjustment.

2. **Concurrent Adjustments**
   - **Scenario**: Simultaneously, two agents adjust the inventory of "Hamster Cages"—one adding 20 units and another removing 10 units.
   - **Steps**:
     a. Have two test users logged in as different customer service agents.
     b. Both users navigate to the inventory adjustment screen for "Hamster Cages".
     c. User 1 enters "+20" as the adjustment value.
     d. User 2 enters "-10" as the adjustment value.
     e. Both users submit their adjustments simultaneously (within 1 second of each other).
   - **Expected Result**: 
     - Both adjustments should be applied correctly.
     - The final inventory should reflect a net increase of 10 units.
     - The audit log should show two separate entries, correctly ordered by timestamp.

3. **Maximum Inventory Limit**
   - **Scenario**: Attempt to adjust inventory beyond the system's maximum allowed value.
   - **Steps**:
     a. Log in as a customer service agent.
     b. Select a product currently at the maximum inventory limit (e.g., 999,999 units).
     c. Attempt to add 1 more unit to the inventory.
     d. Submit the adjustment.
   - **Expected Result**: 
     - The system should reject the adjustment.
     - An error message should indicate that the maximum inventory limit has been reached.
     - The inventory level should remain unchanged.

### Integration Testing

1. **REST API Integration**
   - **Scenario**: Test the API endpoint used to communicate inventory adjustments to "SYD-Warehouse-1" for "Organic Dog Food."
   - **Steps**:
     a. Use an API testing tool (e.g., Postman) to send a POST request to the inventory adjustment endpoint.
     b. Include in the request body: product_id, warehouse_id, adjustment_amount, and agent_id.
     c. Send the request with valid data for "Organic Dog Food" in "SYD-Warehouse-1".
     d. Analyze the response from the API.
   - **Expected Result**: 
     - The API should return a 200 OK status code.
     - The response body should include a success message and the new inventory level.
     - The inventory should be updated in both PetCircle's system and the 3PL system.

2. **Error Handling**
   - **Scenario**: Simulate an API timeout when communicating with "BRISBANE-Warehouse-2" during an inventory adjustment for "Cat Toys."
   - **Steps**:
     a. Configure the test environment to introduce a 30-second delay for API calls to "BRISBANE-Warehouse-2".
     b. Attempt to adjust the inventory of "Cat Toys" in "BRISBANE-Warehouse-2" through the user interface.
     c. Monitor the system logs and user interface for error handling.
   - **Expected Result**: 
     - The system should retry the request as per the retry policy (e.g., 3 attempts with exponential backoff).
     - After failed retries, the system should log the timeout error.
     - An error message should be displayed to the user, indicating a communication issue with the warehouse.
     - The inventory adjustment should not be applied, maintaining data consistency.

3. **Data Synchronization**
   - **Scenario**: After adjusting inventory for "Cat Trees" in multiple warehouses, verify that the internal system and all 3PL systems have consistent inventory levels.
   - **Steps**:
     a. Perform inventory adjustments for "Cat Trees" across three different warehouses.
     b. Wait for the standard synchronization interval (e.g., 5 minutes).
     c. Query the inventory levels for "Cat Trees" in PetCircle's internal system.
     d. Query the inventory levels for "Cat Trees" in each 3PL system through their respective APIs.
     e. Compare the results from all systems.
   - **Expected Result**: 
     - All systems (internal and 3PL) should show the same inventory level for "Cat Trees" in each warehouse.
     - Any discrepancies should be flagged and logged for investigation.

4. **Rollback Mechanism**
   - **Scenario**: Simulate a failure during an inventory adjustment of "Dog Collars" to "NSWWarehouse-1."
   - **Steps**:
     a. Configure the test environment to introduce a failure (e.g., database connection error) after updating the internal system but before updating the 3PL system.
     b. Initiate an inventory adjustment for "Dog Collars" in "NSWWarehouse-1".
     c. Allow the failure to occur and observe the system's response.
   - **Expected Result**: 
     - The system should detect the failure in updating the 3PL system.
     - The rollback mechanism should activate, reverting the change in the internal system.
     - An error log should be generated detailing the failure and rollback action.
     - The inventory levels in both internal and 3PL systems should remain unchanged from their pre-adjustment state.

### Performance Testing

1. **High Volume Adjustments**
   - **Scenario**: Simulate 1,000 simultaneous inventory adjustments for various products such as "Dog Food," "Cat Litter," and "Bird Seeds."
   - **Steps**:
     a. Use a performance testing tool (e.g., JMeter) to simulate 1,000 concurrent users.
     b. Each simulated user attempts to make a random inventory adjustment.
     c. Monitor system response times, CPU usage, and database performance during the test.
     d. Run the test for 10 minutes.
   - **Expected Result**: 
     - The system should handle the load without crashing.
     - Response times should remain under 2 seconds for 95% of requests.
     - CPU usage should not exceed 80% sustained.
     - All 1,000 adjustments should be processed correctly without data inconsistencies.

2. **API Throughput**
   - **Scenario**: Measure the throughput of the REST API under high load conditions with multiple inventory adjustments requests per second.
   - **Steps**:
     a. Configure a load testing tool to send inventory adjustment API requests.
     b. Gradually increase the request rate from 10 requests per second to 100 requests per second over 30 minutes.
     c. Monitor the API response times, success rates, and error rates.
   - **Expected Result**: 
     - The API should maintain a throughput of at least 50 successful requests per second.
     - Error rates should remain below 1% of total requests.
     - Average response time should be less than 500ms up to 50 requests per second.

3. **Stress Testing**
   - **Scenario**: Push the system to its limits by creating extremely large numbers of inventory adjustments and concurrent users.
   - **Steps**:
     a. Simulate 5,000 concurrent users making inventory adjustments.
     b. Continuously increase the number of adjustments and users until system failure or significant performance degradation.
     c. Monitor system resources, response times, and error rates throughout the test.
   - **Expected Result**: 
     - Identify the breaking point of the system (e.g., maximum concurrent users or transactions per second).
     - Observe graceful degradation rather than catastrophic failure.
     - System should recover to normal performance levels within 5 minutes of reducing the load.

### Regression Testing

1. **Existing Functionality**
   - **Scenario**: Verify that existing features such as order fulfillment and reporting functions correctly after the new inventory management feature is integrated.
   - **Steps**:
     a. Perform a series of inventory adjustments using the new system.
     b. Process several orders through the existing order fulfillment system.
     c. Generate key reports including daily inventory summaries and order fulfillment rates.
   - **Expected Result**: 
     - Order fulfillment should process correctly, reflecting the updated inventory levels.
     - Reports should accurately incorporate data from both old and new inventory adjustments.
     - No errors or inconsistencies should be observed in existing functionalities.

2. **Integration Points**
   - **Scenario**: Check integration points between PetCircle's internal system and third-party logistics to ensure no disruptions in existing workflows, such as order processing.
   - **Steps**:
     a. Initiate a full cycle test including inventory adjustment, order placement, and fulfillment.
     b. Monitor all API calls between PetCircle's system and 3PL systems.
     c. Verify data consistency across all systems at each step.
   - **Expected Result**: 
     - All integration points should function correctly without errors.
     - Data should flow seamlessly between PetCircle and 3PL systems.
     - Order processing times should not be negatively impacted by the new inventory system.

3. **Previous Bugs**
   - **Scenario**: Ensure that previously fixed bugs related to inventory updates, such as incorrect inventory levels or duplicate records, do not reappear.
   - **Steps**:
     a. Review the bug history related to inventory management.
     b. Design test cases that specifically target scenarios related to past bugs.
     c. Execute these test cases in the new system.
   - **Expected Result**: 
     - None of the previously fixed bugs should reoccur.
     - The system should handle all test cases correctly without introducing new issues.

4. **System Updates**
   - **Scenario**: Validate that recent system updates or changes to the inventory management system do not affect the new inventory adjustment feature.
   - **Steps**:
     a. Apply any pending system updates or patches.
     b. Perform a full suite of inventory adjustment operations.
     c. Check all reporting and audit functionalities.
   - **Expected Result**: 
     - The inventory adjustment feature should work flawlessly post-update.
     - No new bugs or issues should be introduced by the system updates.
     - All features, including reporting and auditing, should function as expected.

### Contract Testing

Contract testing ensures that the interactions between PetCircle's inventory management system and the 3PL systems meet the agreed-upon contract, focusing on the structure and content of the requests and responses.

1. **Inventory Adjustment Contract**
   - **Scenario**: Verify that the inventory adjustment request and response conform to the agreed contract between PetCircle and 3PL systems.
   - **Steps**:
     a. Set up a contract testing tool (e.g., Pact, Spring Cloud Contract).
     b. Define the expected request and response structures for inventory adjustment.
     c. Implement consumer tests in PetCircle's system.
     d. Implement provider tests in the 3PL system mock.
     e. Run the contract tests.
   - **Expected Result**: 
     - All contract tests pass successfully.
     - The request from PetCircle's system matches the expected structure (e.g., correct fields, data types).
     - The response from the 3PL system mock matches the expected structure and content.

2. **Inventory Query Contract**
   - **Scenario**: Ensure that inventory query requests and responses adhere to the defined contract.
   - **Steps**:
     a. Define the contract for inventory query operations.
     b. Implement consumer tests for PetCircle's inventory query functionality.
     c. Implement provider tests in the 3PL system mock for responding to inventory queries.
     d. Execute the contract tests for various query scenarios (e.g., single product, multiple products, all products in a warehouse).
   - **Expected Result**: 
     - All inventory query contract tests pass.
     - The query requests contain the required parameters in the correct format.
     - The responses include all necessary inventory data as specified in the contract.

3. **Error Scenario Contracts**
   - **Scenario**: Verify that error responses from 3PL systems conform to the agreed-upon contract.
   - **Steps**:
     a. Define contracts for various error scenarios (e.g., product not found, insufficient inventory, system error).
     b. Implement consumer tests in PetCircle's system to handle these error responses.
     c. Implement provider tests in the 3PL system mock to generate the error responses.
     d. Run contract tests for each error scenario.
   - **Expected Result**: 
     - All error scenario contract tests pass.
     - Error responses contain the agreed-upon fields (e.g., error code, error message, timestamp).
     - PetCircle's system correctly interprets and handles the error responses.

### Component Testing

Component testing focuses on testing individual components of the inventory management system in isolation to ensure they function correctly before integration.

1. **Inventory Adjustment Component**
   - **Scenario**: Test the inventory adjustment component of PetCircle's system in isolation.
   - **Steps**:
     a. Set up a test environment with the inventory adjustment component and necessary dependencies.
     b. Mock the interfaces to other components and external systems.
     c. Perform various inventory adjustments (increase, decrease, zero adjustment).
     d. Verify the component's internal state and output.
   - **Expected Result**: 
     - The component correctly calculates new inventory levels.
     - It generates appropriate events or messages for successful adjustments.
     - The component handles edge cases (e.g., adjustments leading to negative inventory) correctly.

2. **Audit Logging Component**
   - **Scenario**: Verify that the audit logging component correctly records inventory adjustments.
   - **Steps**:
     a. Isolate the audit logging component in a test environment.
     b. Send sample inventory adjustment events to the component.
     c. Retrieve and verify the logged entries.
     d. Test various scenarios including normal adjustments, failed adjustments, and system errors.
   - **Expected Result**: 
     - All inventory adjustments are logged with correct details (timestamp, user, product, quantity, warehouse).
     - Failed adjustments and errors are logged with appropriate error information.
     - The component handles high volumes of concurrent logging requests without data loss.

3. **API Gateway Component**
   - **Scenario**: Test the API gateway component that handles external requests for inventory data.
   - **Steps**:
     a. Set up the API gateway component in a test environment.
     b. Configure mock backends for inventory data.
     c. Send various API requests to the gateway (inventory queries, adjustments).
     d. Verify the responses and request routing.
   - **Expected Result**: 
     - The gateway correctly routes requests to appropriate backend services.
     - It handles authentication and authorization for incoming requests.
     - The gateway provides appropriate error responses for invalid requests.
     - It correctly aggregates data from multiple backend services when necessary.

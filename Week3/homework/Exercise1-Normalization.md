# Homework Databases Week 3

## Database exercises

### Exercise 1 : Normalization

1. What columns violate 1NF?
   - food_code => Each column should have atomic value, no multiple values
   - food_description => Each column should have atomic value, no multiple values
   - dinner_date => We should only use one format for the date
2. What entities do you recognize that could be extracted?
   - We can keep these columns in their own tables.
     - member_name, member_address, dinner_date, venue_description and food_description
3. Name all the tables and columns that would make a 3NF compliant solution.

```
TABLE >> members                                        TABLE >> dinners
+-------------+------------+-----------------------+    +-------------+-------------+------------+
|  member_id  |member_name |    member_address     |    |  dinner_id  | dinner_date | venue_code |
+-------------+------------+-----------------------+    +-------------+-------------+------------+
|       1     |  Amit      | 325 Max park          |    |  D00001001  | 2020-03-15  | B01        |
|       2     |  Ben       | 24 Hudson lane        |    |  D00001002  | 2020-03-15  | B02        |
|       3     |  Cristina  | 516 6th Ave           |    |  D00001003  | 2020-03-20  | B03        |
|       4     |  Dua       | 89 John St            |    |  D00001004  | 2020-03-25  | B04        |
|       5     |  Gabor     | 54 Vivaldi St         |    |  D00001005  | 2020-03-26  | B05        |
|       6     |  Hema      | 9 Peter St            |    +-------------+-------------+------------+
+-------------+------------+-----------------------+


TABLE >> venues                        TABLE >> foods
+------------+--------------------+    +-----------+------------------+
| venue_code | venue_description  |    | food_code | food_description |
+------------+--------------------+    +-----------+------------------+
|     B01    |  Grand Ball Room   |    |    C1     |    Curry         |
|     B02    |  Zoku Roof Top     |    |    C2     |    Cake          |
|     B03    |  Goat Farm         |    |    F1     |    Falafal       |
|     B04    |  Mama's Kitchen    |    |    G1     |    Goulash       |
|     B05    |  Hungry Hungary    |    |    M1     |    Mousse        |
+------------+--------------------+    |    P1     |    Pie           |
                                       |    P2     |    Pasca         |
                                       |    S1     |    Soup          |
                                       |    T1     |    Tea           |
                                       +-----------+------------------+


TABLE >> dinner_members                         TABLE >> dinner_foods
+--------+----------------+----------------+    +---------+----------------+----------------+
| id(PK) | dinner_id (FK) | member_id (FK) |    | id (PK) | dinner_id (FK) | food_code (FK) |
+--------+----------------+----------------+    +---------+----------------+----------------+
|   1    |   D00001001    |        1       |    |    1    |   D00001001    |      C1        |
|   2    |   D00001002    |        2       |    |    2    |   D00001001    |      C2        |
|   3    |   D00001002    |        3       |    |    3    |   D00001002    |      S1        |
|   4    |   D00001003    |        1       |    |    4    |   D00001002    |      C2        |
|   5    |   D00001003    |        4       |    |    5    |   D00001003    |      P1        |
|   6    |   D00001003    |        6       |    |    6    |   D00001003    |      T1        |
|   7    |   D00001004    |        3       |    |    7    |   D00001003    |      M1        |
|   8    |   D00001005    |        5       |    |    8    |   D00001004    |      F1        |
+--------+----------------+----------------+    |    9    |   D00001004    |      M1        |
                                                |   10    |   D00001005    |      G1        |
                                                |   11    |   D00001005    |      P2        |
                                                +---------+----------------+----------------+

```

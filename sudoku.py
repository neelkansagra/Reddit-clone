a = [[4,1,5,0,6,9,0,7,0],
     [0,0,3,0,0,1,0,2,0],
     [0,0,0,4,0,3,5,0,0],
     [6,7,2,1,0,0,0,0,4],
     [8,3,0,0,0,0,0,5,7],
     [5,0,0,0,0,8,0,1,3],
     [2,8,0,0,0,7,1,0,6],
     [0,9,6,0,0,0,0,4,5],
     [1,5,0,6,0,0,8,0,0]]

already = dict()
for i in range(len(a)):
    for j in range(len(a[i])):
        if(a[i][j] ==0):
            continue
        if (3*(i//3) + j//3) in already:
            already[3*(i//3) + j//3].add(a[i][j])
        else:
            s = set()
            s.add(a[i][j])
            already[3*(i//3) + j//3] = s

def solve():
    if (solved(already)):
        return
    
    for 

def solved():
    
    for i in range(9):
        b = set()
        c = set()
        d = set()
        for j in range(9):
            if a[i][j] in b or a[j][i] in c or a[(i//3)*3 + j//3][(i%3)*3 + j%3] in d:
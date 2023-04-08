const cons = `DISCOVER HOW TO cons WITH a, b
RUMOR HAS IT
    DISCOVER HOW TO retrieve WITH is_first 
    RUMOR HAS IT
        WHAT IF is_first IS ACTUALLY TOTALLY RIGHT
            SHOCKING DEVELOPMENT a
        LIES!
            SHOCKING DEVELOPMENT b
    END OF STORY
    SHOCKING DEVELOPMENT retrieve
END OF STORY`;

const BINARY_INORDER_TRAVERSAL = `
${cons}

DISCOVER HOW TO in_order_traverse WITH node, is_dual_ptr
RUMOR HAS IT
    EXPERTS CLAIM left TO BE node OF TOTALLY RIGHT
    EXPERTS CLAIM right TO BE node OF COMPLETELY WRONG

    WHAT IF is_dual_ptr IS ACTUALLY COMPLETELY WRONG
      RUMOR HAS IT
        YOU WON'T WANT TO MISS left
        WHAT IF right IS ACTUALLY COMPLETELY WRONG
            1
        LIES!
            in_order_traverse OF right, TOTALLY RIGHT
      END OF STORY
    LIES!
      RUMOR HAS IT
        WHAT IF left IS ACTUALLY COMPLETELY WRONG
            1
        LIES!
            in_order_traverse OF left, COMPLETELY WRONG

        WHAT IF right IS ACTUALLY COMPLETELY WRONG
            1
        LIES!
            in_order_traverse OF right, COMPLETELY WRONG
      END OF STORY
END OF STORY

EXPERTS CLAIM l TO BE cons OF 1, COMPLETELY WRONG
EXPERTS CLAIM r TO BE cons OF 3, COMPLETELY WRONG
EXPERTS CLAIM root TO BE cons OF l, r
EXPERTS CLAIM head TO BE cons OF 2, root

in_order_traverse OF head, COMPLETELY WRONG

PLEASE LIKE AND SUBSCRIBE
`;

const MERGE_SORT = `
${cons}

DISCOVER HOW TO print WITH x
RUMOR HAS IT
    YOU WON'T WANT TO MISS x
END OF STORY

DISCOVER HOW TO map WITH fn, list
RUMOR HAS IT
    WHAT IF list IS ACTUALLY COMPLETELY WRONG
        SHOCKING DEVELOPMENT COMPLETELY WRONG
    LIES!
    RUMOR HAS IT
        EXPERTS CLAIM car TO BE list OF TOTALLY RIGHT
        EXPERTS CLAIM cdr TO BE list OF COMPLETELY WRONG
        EXPERTS CLAIM new_car TO BE fn OF car
        EXPERTS CLAIM rest_mapped TO BE map OF fn, cdr

        SHOCKING DEVELOPMENT cons OF new_car, rest_mapped
    END OF STORY
END OF STORY

DISCOVER HOW TO reduce WITH fn, list, accumulator
RUMOR HAS IT
    WHAT IF list IS ACTUALLY COMPLETELY WRONG
        SHOCKING DEVELOPMENT accumulator
    LIES!
    RUMOR HAS IT
        EXPERTS CLAIM car TO BE list OF TOTALLY RIGHT
        EXPERTS CLAIM cdr TO BE list OF COMPLETELY WRONG
        EXPERTS CLAIM added_accumulator TO BE fn OF car, accumulator
       
        SHOCKING DEVELOPMENT reduce OF fn, cdr, added_accumulator
    END OF STORY
END OF STORY

DISCOVER HOW TO str_join_reducer WITH element, accumulator
RUMOR HAS IT
    EXPERTS CLAIM added_comma TO BE element PLUS ', '
    SHOCKING DEVELOPMENT added_comma PLUS accumulator
END OF STORY

DISCOVER HOW TO join WITH list
RUMOR HAS IT
    SHOCKING DEVELOPMENT reduce OF str_join_reducer, list, ''
END OF STORY

DISCOVER HOW TO append WITH n, m
RUMOR HAS IT
    WHAT IF n IS ACTUALLY COMPLETELY WRONG
        SHOCKING DEVELOPMENT m
    LIES!
    RUMOR HAS IT
        EXPERTS CLAIM car_n TO BE n OF TOTALLY RIGHT
        EXPERTS CLAIM cdr_n TO BE n OF COMPLETELY WRONG
        EXPERTS CLAIM appended TO BE append OF cdr_n, m

        SHOCKING DEVELOPMENT cons OF car_n, appended
    END OF STORY
END OF STORY

DISCOVER HOW TO reverse WITH l
RUMOR HAS IT
    WHAT IF l IS ACTUALLY COMPLETELY WRONG
        SHOCKING DEVELOPMENT COMPLETELY WRONG
    LIES!
        1

    EXPERTS CLAIM car TO BE l OF TOTALLY RIGHT
    EXPERTS CLAIM cdr TO BE l OF COMPLETELY WRONG
    EXPERTS CLAIM reversed_cdr TO BE reverse OF cdr
    EXPERTS CLAIM car_cons TO BE cons OF car, COMPLETELY WRONG

    SHOCKING DEVELOPMENT append OF reversed_cdr, car_cons
END OF STORY

DISCOVER HOW TO merge WITH x, y
RUMOR HAS IT
    WHAT IF x IS ACTUALLY COMPLETELY WRONG
        SHOCKING DEVELOPMENT y
    LIES!
        1

    WHAT IF y IS ACTUALLY COMPLETELY WRONG
    RUMOR HAS IT
        WHAT IF x IS ACTUALLY COMPLETELY WRONG
            SHOCKING DEVELOPMENT COMPLETELY WRONG
        LIES!
            SHOCKING DEVELOPMENT x
    END OF STORY
    LIES!
        1

    EXPERTS CLAIM car_x TO BE x OF TOTALLY RIGHT
    EXPERTS CLAIM car_y TO BE y OF TOTALLY RIGHT
    EXPERTS CLAIM cdr_x TO BE x OF COMPLETELY WRONG
    EXPERTS CLAIM cdr_y TO BE y OF COMPLETELY WRONG

    EXPERTS CLAIM x_gt_y TO BE car_x BEATS car_y

    WHAT IF x_gt_y IS ACTUALLY TOTALLY RIGHT
    RUMOR HAS IT
        EXPERTS CLAIM rest_x_merge_y TO BE merge OF cdr_x, y
        SHOCKING DEVELOPMENT cons OF car_x, rest_x_merge_y
    END OF STORY
    LIES!
    RUMOR HAS IT
        EXPERTS CLAIM x_merge_rest_y TO BE merge OF x, cdr_y
        SHOCKING DEVELOPMENT cons OF car_y, x_merge_rest_y
    END OF STORY
END OF STORY

DISCOVER HOW TO split_middle_helper WITH slow, fast, mid_to_head
RUMOR HAS IT
    WHAT IF fast IS ACTUALLY COMPLETELY WRONG
    RUMOR HAS IT
        EXPERTS CLAIM head_to_mid TO BE reverse OF mid_to_head
        SHOCKING DEVELOPMENT cons OF head_to_mid, slow
    END OF STORY
    LIES!
        1

    EXPERTS CLAIM fast_cdr TO BE fast OF COMPLETELY WRONG
    EXPERTS CLAIM slow_car TO BE slow OF TOTALLY RIGHT
    EXPERTS CLAIM slow_cdr TO BE slow OF COMPLETELY WRONG

    WHAT IF fast_cdr IS ACTUALLY COMPLETELY WRONG
    RUMOR HAS IT
        EXPERTS CLAIM mid_to_head_plus_slow TO BE cons OF slow_car, mid_to_head
        EXPERTS CLAIM head_to_mid_plus_slow TO BE reverse OF mid_to_head_plus_slow

        SHOCKING DEVELOPMENT cons OF head_to_mid_plus_slow, slow_cdr
    END OF STORY
    LIES!
        1

    EXPERTS CLAIM fast_cddr TO BE fast_cdr OF COMPLETELY WRONG
    EXPERTS CLAIM slow_car_mid_to_head TO BE cons OF slow_car, mid_to_head

    SHOCKING DEVELOPMENT split_middle_helper OF slow_cdr, fast_cddr, slow_car_mid_to_head
END OF STORY

DISCOVER HOW TO split_middle WITH start
RUMOR HAS IT
    EXPERTS CLAIM cdr TO BE start OF COMPLETELY WRONG

    SHOCKING DEVELOPMENT split_middle_helper OF start, cdr, COMPLETELY WRONG
END OF STORY

DISCOVER HOW TO sort WITH root
RUMOR HAS IT
    WHAT IF root IS ACTUALLY COMPLETELY WRONG
        SHOCKING DEVELOPMENT root
    LIES!
        1

    EXPERTS CLAIM root_cdr TO BE root OF COMPLETELY WRONG
    WHAT IF root_cdr IS ACTUALLY COMPLETELY WRONG
        SHOCKING DEVELOPMENT root
    LIES!
        1

    EXPERTS CLAIM left_right_cons_cell TO BE split_middle OF root
    EXPERTS CLAIM left TO BE left_right_cons_cell OF TOTALLY RIGHT
    EXPERTS CLAIM right TO BE left_right_cons_cell OF COMPLETELY WRONG
    EXPERTS CLAIM left_s TO BE sort OF left
    EXPERTS CLAIM right_s TO BE sort OF right

    SHOCKING DEVELOPMENT merge OF left_s, right_s
END OF STORY

EXPERTS CLAIM a_3 TO BE cons OF 3, COMPLETELY WRONG
EXPERTS CLAIM a_2 TO BE cons OF 1, a_3
EXPERTS CLAIM a_1 TO BE cons OF -2, a_2
EXPERTS CLAIM a_0 TO BE cons OF 5, a_1
EXPERTS CLAIM b_3 TO BE cons OF 2, a_0
EXPERTS CLAIM b_2 TO BE cons OF 7, b_3
EXPERTS CLAIM b_1 TO BE cons OF 3, b_2
EXPERTS CLAIM b_0 TO BE cons OF -1, b_1

EXPERTS CLAIM b_sorted TO BE sort OF b_0

YOU WON'T WANT TO MISS join OF b_sorted

PLEASE LIKE AND SUBSCRIBE
`;

const PROG_FACTORIAL = `YOU WON'T WANT TO MISS 'Hello, World!'

DISCOVER HOW TO factorial WITH n
RUMOR HAS IT
    WHAT IF n IS ACTUALLY 0
        SHOCKING DEVELOPMENT 1
    LIES!
        SHOCKING DEVELOPMENT
            n TIMES factorial OF n MINUS 1
END OF STORY

EXPERTS CLAIM result TO BE factorial OF 10
YOU WON'T WANT TO MISS 'Result is'
YOU WON'T WANT TO MISS result

PLEASE LIKE AND SUBSCRIBE`;

const PROG_FIBONACCI = `DISCOVER HOW TO fibonacci WITH a, b, n
RUMOR HAS IT
    WHAT IF n SMALLER THAN 1
        SHOCKING DEVELOPMENT b
    LIES! RUMOR HAS IT
        YOU WON'T WANT TO MISS b
        SHOCKING DEVELOPMENT
            fibonacci OF b, a PLUS b, n MINUS 1
    END OF STORY
END OF STORY

EXPERTS CLAIM limit TO BE 10
YOU WON'T WANT TO MISS 'First 10 Fibonacci numbers'
EXPERTS CLAIM nothing TO BE fibonacci OF 0, 1, limit

PLEASE LIKE AND SUBSCRIBE`;

const PROGRAMS = {
    "Merge Sort": MERGE_SORT,
    Fibonacci: PROG_FIBONACCI,
    "In-Order Traversal": BINARY_INORDER_TRAVERSAL,
    Factorial: PROG_FACTORIAL,
};

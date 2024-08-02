'use server'

export interface LeetCodeQuestion {
    id: number;
    title: string;
    difficulty: string;
    description: string;
}

export async function fetchInitialLeetCodeQuestions(): Promise<LeetCodeQuestion[]> {
    return [
        { id: 1, title: "Two Sum", difficulty: "Easy", description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target." },
        { id: 2, title: "Add Two Numbers", difficulty: "Medium", description: "You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each of their nodes contains a single digit." },
        { id: 3, title: "Median of Two Sorted Arrays", difficulty: "Hard", description: "Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays." },
        { id: 4, title: "Longest Palindromic Substring", difficulty: "Medium", description: "Given a string s, return the longest palindromic substring in s." },
        { id: 5, title: "Regular Expression Matching", difficulty: "Hard", description: "Given an input string s and a pattern p, implement regular expression matching with support for '.' and '*' where '.' matches any single character and '*' matches zero or more of the preceding element." },
        { id: 6, title: "Container With Most Water", difficulty: "Medium", description: "Given n non-negative integers a1, a2, ..., an , where each represents a point at coordinate (i, ai). n vertical lines are drawn such that the two endpoints of the line i is at (i, ai) and (i, 0). Find two lines, which, together with the x-axis forms a container, such that the container contains the most water." },
        { id: 7, title: "Valid Parentheses", difficulty: "Easy", description: "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid." },
        { id: 8, title: "Merge k Sorted Lists", difficulty: "Hard", description: "You are given an array of k linked-lists lists, each linked-list is sorted in ascending order. Merge all the linked-lists into one sorted linked-list and return it." },
        { id: 9, title: "Reverse Nodes in k-Group", difficulty: "Hard", description: "Given a linked list, reverse the nodes of a linked list k at a time and return its modified list." },
        { id: 10, title: "Remove Duplicates from Sorted Array", difficulty: "Easy", description: "Given a sorted array nums, remove the duplicates in-place such that each element appears only once and returns the new length." },
        { id: 11, title: "Implement strStr()", difficulty: "Easy", description: "Return the index of the first occurrence of needle in haystack, or -1 if needle is not part of haystack." },
        { id: 12, title: "Divide Two Integers", difficulty: "Medium", description: "Given two integers dividend and divisor, divide two integers without using multiplication, division, and mod operator." },
        { id: 13, title: "Substring with Concatenation of All Words", difficulty: "Hard", description: "You are given a string s and an array of strings words of the same length. Return all starting indices of substring(s) in s that is a concatenation of each word in words exactly once, in any order, and without any intervening characters." },
        { id: 14, title: "Next Permutation", difficulty: "Medium", description: "Implement next permutation, which rearranges numbers into the lexicographically next greater permutation of numbers." },
        { id: 15, title: "Longest Valid Parentheses", difficulty: "Hard", description: "Given a string containing just the characters '(' and ')', find the length of the longest valid (well-formed) parentheses substring." },
        { id: 16, title: "Search in Rotated Sorted Array", difficulty: "Medium", description: "Given an integer array nums sorted in ascending order, and an integer target, search for target in nums. If target exists, then return its index. Otherwise, return -1." },
        { id: 17, title: "Find First and Last Position of Element in Sorted Array", difficulty: "Medium", description: "Given an array of integers nums sorted in ascending order, find the starting and ending position of a given target value." },
        { id: 18, title: "Valid Sudoku", difficulty: "Medium", description: "Determine if a 9 x 9 Sudoku board is valid. Only the filled cells need to be validated according to the following rules." }
    ]
}

export async function feedback(questionId: number, feedback: string) {
    console.log("swiped", questionId, feedback)
}
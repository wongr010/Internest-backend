//
//  TDItem.m
//  ToDo
//
//  Created by Nicholas Gerard on 1/5/16.
//  Copyright © 2016 Microsoft. All rights reserved.
//

#import "TDItem.h"

@implementation TDItem

+ (id)toDoItemWithText:(NSString *)text
{
    return [[TDItem alloc] initWithText:text];
}

+ (id)todoItemWithText:(NSString*)text isComplete:(BOOL)complete
{
    TDItem *item = [[TDItem alloc] initWithText:text];
    item.completed = complete;
    return item;
}

- (id)initWithText:(NSString*)text
{
    if (self = [super init]) {
        self.text = text;
    }
    return self;
}

- (NSDictionary*)serialize
{
    return @{ self.text : @(self.completed) };
}

@end
//
//  TDItem.h
//  ToDo
//
//  Created by Nicholas Gerard on 1/5/16.
//  Copyright © 2016 Microsoft. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface TDItem : NSObject

@property (nonatomic, copy) NSString *text;
@property (nonatomic) BOOL completed;

+ (id)toDoItemWithText:(NSString*)text;
+ (id)todoItemWithText:(NSString*)text isComplete:(BOOL)complete;

- (id)initWithText:(NSString*)text;
- (NSDictionary*)serialize;

@end

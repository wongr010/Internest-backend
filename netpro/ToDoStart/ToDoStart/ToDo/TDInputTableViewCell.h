//
//  TDInputTableViewCell.h
//  ToDo
//
//  Created by Nicholas Gerard on 1/6/16.
//  Copyright © 2016 Microsoft. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "TDItem.h"

@protocol TDInputTableViewCellDelegate <NSObject>

// The cell's delegate is notified when a new to do item is created
- (void) toDoItemAdded:(TDItem*) todoItem;

@end

@interface TDInputTableViewCell : UITableViewCell <UITextFieldDelegate>

@property (nonatomic, assign) id<TDInputTableViewCellDelegate> delegate;

@end

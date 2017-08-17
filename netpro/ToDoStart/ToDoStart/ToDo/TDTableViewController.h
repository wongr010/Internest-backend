//
//  TDTableViewController.h
//  ToDo
//
//  Created by Nicholas Gerard on 1/5/16.
//  Copyright © 2016 Microsoft. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "TDItem.h"
#import "TDTableViewCell.h"
#import "TDInputTableViewCell.h"

@interface TDTableViewController : UITableViewController <TDTableViewCellDelegate, TDInputTableViewCellDelegate>

@end
